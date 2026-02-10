// server-integrated.js - Complete server with WebRTC signaling
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// WebSocket servers
const mainWss = new WebSocket.Server({ server, path: '/ws' });
const rtcWss = new WebSocket.Server({ server, path: '/webrtc' });

// Configuration
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/openchat';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use('/api/', limiter);

// MongoDB Models (from previous server.js)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayName: { type: String, required: true },
    avatar: { type: String, default: null },
    status: { type: String, enum: ['online', 'idle', 'dnd', 'offline'], default: 'offline' },
    createdAt: { type: Date, default: Date.now }
});

const serverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String, default: null },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

const channelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['text', 'voice'], required: true },
    server: { type: mongoose.Schema.Types.ObjectId, ref: 'Server', required: true },
    category: { type: String, default: 'General' },
    position: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
    encrypted: { type: Boolean, default: false },
    attachments: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Server = mongoose.model('Server', serverSchema);
const Channel = mongoose.model('Channel', channelSchema);
const Message = mongoose.model('Message', messageSchema);

// Connect to MongoDB
mongoose.connect(MONGODB_URI).then(() => {
    console.log('✓ Connected to MongoDB');
    
    // Start server AFTER MongoDB connects
    server.listen(PORT, () => {
        console.log(`
╔════════════════════════════════════════╗
║  Dicsord Server Running                ║
║  Port: ${PORT}                         ║
║  MongoDB: Connected                    ║
║                                        ║
║  A Foveated Production ⚡              ║
╚════════════════════════════════════════╝
        `);
    });
}).catch(err => {
    console.error('✗ MongoDB connection error:', err);
    process.exit(1);
});
// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// API Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password, displayName } = req.body;

        if (!username || !email || !password || !displayName) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            displayName,
            status: 'online'
        });

        await user.save();

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                displayName: user.displayName,
                avatar: user.avatar,
                status: user.status
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        user.status = 'online';
        await user.save();

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                displayName: user.displayName,
                avatar: user.avatar,
                status: user.status
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/servers', authenticateToken, async (req, res) => {
    try {
        const servers = await Server.find({ members: req.user.userId })
            .populate('owner', 'username displayName avatar')
            .sort({ createdAt: -1 });
        res.json({ servers });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/servers', authenticateToken, async (req, res) => {
    try {
        const { name, icon } = req.body;

        const server = new Server({
            name,
            icon,
            owner: req.user.userId,
            members: [req.user.userId]
        });

        await server.save();

        const generalText = new Channel({
            name: 'general',
            type: 'text',
            server: server._id,
            category: 'TEXT CHANNELS',
            position: 0
        });

        const generalVoice = new Channel({
            name: 'General Voice',
            type: 'voice',
            server: server._id,
            category: 'VOICE CHANNELS',
            position: 0
        });

        await generalText.save();
        await generalVoice.save();

        res.json({ server });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/servers/:serverId/channels', authenticateToken, async (req, res) => {
    try {
        const { serverId } = req.params;
        const server = await Server.findById(serverId);
        
        if (!server || !server.members.includes(req.user.userId)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const channels = await Channel.find({ server: serverId }).sort({ position: 1 });
        res.json({ channels });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/channels/:channelId/messages', authenticateToken, async (req, res) => {
    try {
        const { channelId } = req.params;
        const limit = parseInt(req.query.limit) || 50;

        const channel = await Channel.findById(channelId).populate('server');
        if (!channel || !channel.server.members.includes(req.user.userId)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const messages = await Message.find({ channel: channelId })
            .populate('author', 'username displayName avatar')
            .sort({ createdAt: -1 })
            .limit(limit);

        res.json({ messages: messages.reverse() });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/servers/:serverId/members', authenticateToken, async (req, res) => {
    try {
        const { serverId } = req.params;
        const server = await Server.findById(serverId).populate('members', 'username displayName avatar status');
        
        if (!server || !server.members.some(m => m._id.toString() === req.user.userId)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        res.json({ members: server.members });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Main WebSocket (Chat)
const chatClients = new Map();

mainWss.on('connection', (ws) => {
    console.log('New chat WebSocket connection');
    let userId = null;

    ws.on('message', async (data) => {
        try {
            const message = JSON.parse(data);

            if (message.type === 'authenticate') {
                const decoded = jwt.verify(message.token, JWT_SECRET);
                userId = decoded.userId;
                chatClients.set(userId, ws);
                await User.findByIdAndUpdate(userId, { status: 'online' });
                ws.send(JSON.stringify({ type: 'authenticated', userId }));
                return;
            }

            if (!userId) {
                ws.send(JSON.stringify({ type: 'error', message: 'Not authenticated' }));
                return;
            }

            if (message.type === 'message') {
                const newMessage = new Message({
                    content: message.content,
                    author: userId,
                    channel: message.channelId,
                    encrypted: message.encrypted || false
                });
                await newMessage.save();
                await newMessage.populate('author', 'username displayName avatar');

                const channel = await Channel.findById(message.channelId).populate('server');
                channel.server.members.forEach(memberId => {
                    const client = chatClients.get(memberId.toString());
                    if (client && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ type: 'new_message', message: newMessage }));
                    }
                });
            }
        } catch (error) {
            console.error('WebSocket error:', error);
        }
    });

    ws.on('close', async () => {
        if (userId) {
            chatClients.delete(userId);
            await User.findByIdAndUpdate(userId, { status: 'offline' });
        }
    });
});

// WebRTC Signaling WebSocket
const rtcRooms = new Map();
const rtcClients = new Map();

rtcWss.on('connection', (ws) => {
    console.log('New WebRTC connection');

    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);

            switch (message.type) {
                case 'join':
                    const { roomId, userId, peerId } = message;
                    rtcClients.set(ws, { userId, roomId, peerId });

                    if (!rtcRooms.has(roomId)) {
                        rtcRooms.set(roomId, new Set());
                    }

                    const room = rtcRooms.get(roomId);
                    const existingPeers = Array.from(room).map(client => {
                        const info = rtcClients.get(client);
                        return { userId: info.userId, peerId: info.peerId };
                    });

                    ws.send(JSON.stringify({ type: 'peers', peers: existingPeers }));
                    room.add(ws);

                    room.forEach(client => {
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify({ type: 'peer-joined', userId, peerId }));
                        }
                    });
                    break;

                case 'offer':
                case 'answer':
                case 'ice-candidate':
                    const client = rtcClients.get(ws);
                    if (!client) return;

                    const targetClient = Array.from(rtcClients.entries()).find(
                        ([_, info]) => info.peerId === message.targetPeerId
                    )?.[0];

                    if (targetClient && targetClient.readyState === WebSocket.OPEN) {
                        targetClient.send(JSON.stringify({
                            ...message,
                            peerId: client.peerId,
                            userId: client.userId
                        }));
                    }
                    break;

                case 'leave':
                    const leavingClient = rtcClients.get(ws);
                    if (leavingClient) {
                        const leavingRoom = rtcRooms.get(leavingClient.roomId);
                        if (leavingRoom) {
                            leavingRoom.delete(ws);
                            leavingRoom.forEach(client => {
                                if (client.readyState === WebSocket.OPEN) {
                                    client.send(JSON.stringify({
                                        type: 'peer-left',
                                        peerId: leavingClient.peerId
                                    }));
                                }
                            });
                        }
                        rtcClients.delete(ws);
                    }
                    break;
            }
        } catch (error) {
            console.error('WebRTC signaling error:', error);
        }
    });

    ws.on('close', () => {
        const client = rtcClients.get(ws);
        if (client) {
            const room = rtcRooms.get(client.roomId);
            if (room) {
                room.delete(ws);
                room.forEach(c => {
                    if (c.readyState === WebSocket.OPEN) {
                        c.send(JSON.stringify({ type: 'peer-left', peerId: client.peerId }));
                    }
                });
            }
            rtcClients.delete(ws);
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        uptime: process.uptime()
    });
});


// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(() => {
        mongoose.connection.close(false, () => {
            console.log('Server closed');
            process.exit(0);
        });
    });
});

module.exports = { app, server };
