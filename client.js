// client.js - Frontend WebSocket and WebRTC client
class OpenChatClient {
    constructor() {
        this.ws = null;
        this.token = localStorage.getItem('token');
        this.user = null;
        this.currentServer = null;
        this.currentChannel = null;
        this.rtcConnections = new Map(); // peerId -> RTCPeerConnection
        this.localStream = null;
        this.rtcWs = null;
        this.peerId = this.generatePeerId();
    }

    generatePeerId() {
        return Math.random().toString(36).substring(2, 15);
    }

    // Authentication
    async register(username, email, password, displayName) {
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password, displayName })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            this.token = data.token;
            this.user = data.user;
            localStorage.setItem('token', this.token);
            
            this.connectWebSocket();
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            this.token = data.token;
            this.user = data.user;
            localStorage.setItem('token', this.token);
            
            this.connectWebSocket();
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    logout() {
        this.disconnectWebSocket();
        this.disconnectWebRTC();
        localStorage.removeItem('token');
        this.token = null;
        this.user = null;
    }

    // WebSocket connection
    connectWebSocket() {
        this.ws = new WebSocket('ws://localhost:3000');

        this.ws.onopen = () => {
            console.log('WebSocket connected');
            
            // Authenticate
            this.ws.send(JSON.stringify({
                type: 'authenticate',
                token: this.token
            }));
        };

        this.ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.handleWebSocketMessage(message);
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.ws.onclose = () => {
            console.log('WebSocket disconnected');
            // Attempt to reconnect after 3 seconds
            setTimeout(() => {
                if (this.token) {
                    this.connectWebSocket();
                }
            }, 3000);
        };
    }

    disconnectWebSocket() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    handleWebSocketMessage(message) {
        switch (message.type) {
            case 'authenticated':
                console.log('Authenticated via WebSocket');
                this.onAuthenticated && this.onAuthenticated();
                break;
            case 'new_message':
                this.onNewMessage && this.onNewMessage(message.message);
                break;
            case 'typing':
                this.onTyping && this.onTyping(message.userId, message.channelId);
                break;
            case 'voice_state':
                this.onVoiceState && this.onVoiceState(message);
                break;
            case 'user_status':
                this.onUserStatus && this.onUserStatus(message.userId, message.status);
                break;
            case 'error':
                console.error('Server error:', message.message);
                break;
        }
    }

    // Send message
    sendMessage(channelId, content, encrypted = false) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.error('WebSocket not connected');
            return;
        }

        this.ws.send(JSON.stringify({
            type: 'message',
            channelId,
            content,
            encrypted
        }));
    }

    // Send typing indicator
    sendTyping(channelId) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            return;
        }

        this.ws.send(JSON.stringify({
            type: 'typing',
            channelId
        }));
    }

    // Update status
    updateStatus(status) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            return;
        }

        this.ws.send(JSON.stringify({
            type: 'status_change',
            status
        }));
    }

    // API calls
    async getServers() {
        const response = await fetch('http://localhost:3000/api/servers', {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return await response.json();
    }

    async createServer(name, icon = null) {
        const response = await fetch('http://localhost:3000/api/servers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify({ name, icon })
        });
        return await response.json();
    }

    async getChannels(serverId) {
        const response = await fetch(`http://localhost:3000/api/servers/${serverId}/channels`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return await response.json();
    }

    async getMessages(channelId, limit = 50, before = null) {
        let url = `http://localhost:3000/api/channels/${channelId}/messages?limit=${limit}`;
        if (before) {
            url += `&before=${before}`;
        }
        
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return await response.json();
    }

    async getMembers(serverId) {
        const response = await fetch(`http://localhost:3000/api/servers/${serverId}/members`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        });
        return await response.json();
    }

    // WebRTC Voice Chat
    async joinVoiceChannel(channelId) {
        try {
            // Get local media stream
            this.localStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                },
                video: false
            });

            // Connect to WebRTC signaling server
            this.rtcWs = new WebSocket('ws://localhost:3000/webrtc');

            this.rtcWs.onopen = () => {
                console.log('WebRTC signaling connected');
                
                // Join room
                this.rtcWs.send(JSON.stringify({
                    type: 'join',
                    roomId: channelId,
                    userId: this.user.id,
                    peerId: this.peerId
                }));
            };

            this.rtcWs.onmessage = (event) => {
                const message = JSON.parse(event.data);
                this.handleRTCMessage(message);
            };

            this.rtcWs.onerror = (error) => {
                console.error('WebRTC signaling error:', error);
            };

            // Notify via main WebSocket
            this.ws.send(JSON.stringify({
                type: 'voice_state',
                channelId,
                connected: true,
                muted: false,
                deafened: false
            }));

            return true;
        } catch (error) {
            console.error('Error joining voice channel:', error);
            throw error;
        }
    }

    async handleRTCMessage(message) {
        switch (message.type) {
            case 'peers':
                // Create connections to existing peers
                for (const peer of message.peers) {
                    await this.createPeerConnection(peer.peerId, peer.userId, true);
                }
                break;
            case 'peer-joined':
                // New peer joined, wait for their offer
                console.log('Peer joined:', message.peerId);
                break;
            case 'offer':
                await this.handleOffer(message.peerId, message.offer, message.userId);
                break;
            case 'answer':
                await this.handleAnswer(message.peerId, message.answer);
                break;
            case 'ice-candidate':
                await this.handleIceCandidate(message.peerId, message.candidate);
                break;
            case 'peer-left':
                this.removePeerConnection(message.peerId);
                break;
        }
    }

    async createPeerConnection(peerId, userId, initiator = false) {
        const configuration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        };

        const pc = new RTCPeerConnection(configuration);

        // Add local stream
        this.localStream.getTracks().forEach(track => {
            pc.addTrack(track, this.localStream);
        });

        // Handle incoming stream
        pc.ontrack = (event) => {
            console.log('Received remote track from', peerId);
            this.onRemoteStream && this.onRemoteStream(peerId, event.streams[0]);
        };

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                this.rtcWs.send(JSON.stringify({
                    type: 'ice-candidate',
                    targetPeerId: peerId,
                    candidate: event.candidate
                }));
            }
        };

        pc.oniceconnectionstatechange = () => {
            console.log('ICE connection state:', pc.iceConnectionState);
        };

        this.rtcConnections.set(peerId, pc);

        // If initiator, create and send offer
        if (initiator) {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            this.rtcWs.send(JSON.stringify({
                type: 'offer',
                targetPeerId: peerId,
                offer: offer
            }));
        }

        return pc;
    }

    async handleOffer(peerId, offer, userId) {
        const pc = await this.createPeerConnection(peerId, userId, false);
        
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        this.rtcWs.send(JSON.stringify({
            type: 'answer',
            targetPeerId: peerId,
            answer: answer
        }));
    }

    async handleAnswer(peerId, answer) {
        const pc = this.rtcConnections.get(peerId);
        
        if (pc) {
            await pc.setRemoteDescription(new RTCSessionDescription(answer));
        }
    }

    async handleIceCandidate(peerId, candidate) {
        const pc = this.rtcConnections.get(peerId);
        
        if (pc) {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
        }
    }

    removePeerConnection(peerId) {
        const pc = this.rtcConnections.get(peerId);
        
        if (pc) {
            pc.close();
            this.rtcConnections.delete(peerId);
        }

        this.onPeerLeft && this.onPeerLeft(peerId);
    }

    leaveVoiceChannel() {
        // Close all peer connections
        this.rtcConnections.forEach(pc => pc.close());
        this.rtcConnections.clear();

        // Stop local stream
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }

        // Close WebRTC signaling connection
        if (this.rtcWs) {
            this.rtcWs.send(JSON.stringify({
                type: 'leave'
            }));
            this.rtcWs.close();
            this.rtcWs = null;
        }

        // Notify via main WebSocket
        if (this.currentChannel) {
            this.ws.send(JSON.stringify({
                type: 'voice_state',
                channelId: this.currentChannel,
                connected: false
            }));
        }
    }

    toggleMute() {
        if (!this.localStream) return false;

        const audioTrack = this.localStream.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            return !audioTrack.enabled; // Return muted state
        }
        return false;
    }

    disconnectWebRTC() {
        this.leaveVoiceChannel();
    }
}

// Export for use in browser
if (typeof window !== 'undefined') {
    window.OpenChatClient = OpenChatClient;
}

module.exports = OpenChatClient;
