# OpenChat - Privacy-Focused Discord Alternative

A real-time chat application with voice channels, built as a privacy-focused alternative to Discord. No invasive ID verification required.

## Features

✅ **Real-time Messaging** - WebSocket-based instant messaging
✅ **Voice Channels** - WebRTC peer-to-peer voice communication
✅ **Server Organization** - Multiple servers with text and voice channels
✅ **User Authentication** - JWT-based auth without invasive verification
✅ **Member Management** - See who's online with status indicators
✅ **Rate Limiting** - Built-in protection against spam
✅ **Privacy First** - No ID verification, minimal data collection
✅ **Self-Hostable** - Run on your own infrastructure
✅ **Docker Support** - Easy deployment with Docker Compose

## Technology Stack

**Backend:**
- Node.js + Express
- WebSocket (ws library)
- WebRTC for voice/video
- MongoDB for data storage
- JWT for authentication
- bcrypt for password hashing

**Frontend:**
- Vanilla JavaScript (can be adapted to React/Vue)
- WebSocket client
- WebRTC API
- Responsive CSS

## Prerequisites

- Node.js 18+ 
- MongoDB 5+
- Modern web browser with WebRTC support

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup MongoDB

**Option A: Local MongoDB**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb
```

**Option B: MongoDB Docker**
```bash
docker run -d -p 27017:27017 --name openchat-mongo mongo:7
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
nano .env
```

**Important:** Change the `JWT_SECRET` in production!

### 4. Start the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on `http://localhost:3000`

### 5. Open the Frontend

Open `discord-alternative.html` in your web browser, or serve it with:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server -p 8000
```

Then navigate to `http://localhost:8000/discord-alternative.html`

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

This will start:
- MongoDB database
- OpenChat backend server
- Nginx reverse proxy (optional)

### Manual Docker Build

```bash
# Build image
docker build -t openchat .

# Run container
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/openchat \
  -e JWT_SECRET=your-secret \
  openchat
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Servers
- `GET /api/servers` - Get user's servers
- `POST /api/servers` - Create new server
- `GET /api/servers/:serverId/channels` - Get server channels
- `GET /api/servers/:serverId/members` - Get server members

### Messages
- `GET /api/channels/:channelId/messages` - Get channel messages

### WebSocket Events

**Client → Server:**
- `authenticate` - Authenticate WebSocket connection
- `message` - Send chat message
- `typing` - Typing indicator
- `voice_state` - Voice channel state change
- `status_change` - Update user status

**Server → Client:**
- `authenticated` - Authentication successful
- `new_message` - New message received
- `typing` - User is typing
- `voice_state` - Voice state update
- `user_status` - User status changed

## WebRTC Voice Chat

The voice chat uses WebRTC for peer-to-peer audio streaming:

1. Join a voice channel
2. WebRTC signaling server coordinates connections
3. Peers establish direct audio streams
4. STUN servers help with NAT traversal

**STUN Servers Used:**
- stun:stun.l.google.com:19302
- stun:stun1.l.google.com:19302

For production, consider adding TURN servers for better connectivity behind strict firewalls.

## Production Deployment

### 1. Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Enable HTTPS/TLS encryption
- [ ] Configure firewall rules
- [ ] Set up rate limiting
- [ ] Enable CORS only for your domain
- [ ] Use environment variables for secrets
- [ ] Implement backup strategy for MongoDB
- [ ] Add monitoring and logging

### 2. HTTPS Setup

Use Let's Encrypt for free SSL certificates:

```bash
# Install certbot
sudo apt-get install certbot

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com

# Update nginx.conf with SSL paths
```

### 3. Process Manager

Use PM2 to keep the server running:

```bash
npm install -g pm2

# Start application
pm2 start server.js --name openchat

# Auto-restart on reboot
pm2 startup
pm2 save
```

### 4. Database Backup

```bash
# Backup MongoDB
mongodump --db openchat --out /backup/$(date +%Y%m%d)

# Restore
mongorestore --db openchat /backup/20240101/openchat
```

## Scaling Considerations

### Horizontal Scaling

For multiple server instances:

1. **Use Redis for pub/sub** - Sync WebSocket messages across instances
2. **Sticky sessions** - Route users to same server instance
3. **Load balancer** - Nginx or HAProxy
4. **Shared storage** - For file uploads (S3, MinIO)

### Database Scaling

- **MongoDB Replica Set** - High availability
- **Sharding** - For very large datasets
- **Connection pooling** - Optimize connections

## Future Enhancements

Planned features:

- [ ] End-to-end encryption for messages
- [ ] File sharing and attachments
- [ ] Video chat support
- [ ] Screen sharing
- [ ] Bot API for integrations
- [ ] Mobile apps (React Native)
- [ ] Message search
- [ ] Emoji reactions
- [ ] Thread replies
- [ ] Role-based permissions
- [ ] Server templates
- [ ] Invite system

## Privacy Features

Unlike Discord, OpenChat:

- ✅ No phone number verification
- ✅ No government ID scanning
- ✅ Minimal data collection
- ✅ Self-hostable (full control)
- ✅ Open source (audit the code)
- ✅ No analytics tracking
- ✅ Optional E2E encryption
- ✅ Delete your data anytime

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Security

Found a security issue? Please email security@openchat.example instead of creating a public issue.

## License

MIT License - See LICENSE file for details

## Support

- Documentation: [docs.openchat.example]
- Community: [community.openchat.example]
- Issues: [GitHub Issues]

## Acknowledgments

Built as a privacy-focused alternative for users concerned about invasive verification requirements.

---

**Note:** This is a functional prototype. For production use, additional security hardening, testing, and optimization are recommended.
