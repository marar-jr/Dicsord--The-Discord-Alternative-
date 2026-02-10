# Dicsord

> **A privacy-focused Discord alternative. No ID verification required.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-18%2B-green.svg)
![MongoDB](https://img.shields.io/badge/mongodb-7%2B-green.svg)

**A Foveated Production ⚡**

---

## 🎯 Why Dicsord?

Discord now requires government ID verification for certain features. **Dicsord** is a privacy-respecting alternative that gives you full functionality without invasive verification.

### ✨ Features

- 🔒 **No ID Verification** - Ever
- 📱 **No Phone Number Required**
- 🏠 **Self-Hostable** - Own your data
- 🎙️ **Voice Chat** - WebRTC peer-to-peer
- 💬 **Real-time Messaging** - WebSocket powered
- 👥 **Servers & Channels** - Familiar Discord-like structure
- 🔓 **100% Open Source** - Audit the code yourself
- 🐳 **Docker Ready** - One command deployment

---

## 🚀 Quick Start

### Option 1: Try It Live (Coming Soon)

Visit: **[dicsord-demo.railway.app](#)** (Deployment in progress)

### Option 2: Run Locally

#### Prerequisites

- [Node.js 18+](https://nodejs.org/)
- [MongoDB 7+](https://www.mongodb.com/try/download/community)

#### Installation

```bash
# 1. Clone the repository
git clone https://github.com/marar-jr/Dicsord--The-Discord-Alternative-.git
cd Dicsord--The-Discord-Alternative-

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and change JWT_SECRET to a random string

# 4. Start MongoDB
# Windows:
mongod --dbpath=C:\data\db

# Mac/Linux:
mongod

# 5. Start the server (in a new terminal)
node server-integrated.js

# 6. Open the app
# Open dicsord-login.html in your browser
```

### Option 3: Docker (Easiest!)

```bash
# 1. Clone the repository
git clone https://github.com/marar-jr/Dicsord--The-Discord-Alternative-.git
cd Dicsord--The-Discord-Alternative-

# 2. Start everything with Docker
docker-compose up -d

# 3. Access the app
# Open http://localhost:3000 in your browser
```

---

## 📖 How to Use

1. **Register** - Create an account (no email verification!)
2. **Create a Server** - Start your own community
3. **Add Channels** - Text and voice channels
4. **Invite Friends** - Share your server
5. **Chat & Voice** - Enjoy privacy-focused communication

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express, WebSocket
- **Database**: MongoDB
- **Authentication**: JWT
- **Voice**: WebRTC (peer-to-peer)
- **Frontend**: Vanilla JavaScript, HTML5, CSS3

---

## 🔧 Configuration

Edit `.env` to customize:

```env
# Server
PORT=3000
NODE_ENV=development

# Security
JWT_SECRET=your-super-secret-key-here

# Database
MONGODB_URI=mongodb://localhost:27017/dicsord

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# WebRTC
STUN_SERVER=stun:stun.l.google.com:19302
```

---

## 🐳 Docker Deployment

The included `docker-compose.yml` sets up everything:

- MongoDB database
- Node.js backend server
- Nginx reverse proxy (optional)

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

---

## 🌐 Deployment Options

### Railway (Recommended)

1. Fork this repository
2. Go to [Railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your fork
5. Add MongoDB service
6. Set environment variables
7. Deploy!

### Render.com

1. Fork this repository
2. Go to [Render.com](https://render.com)
3. Create new "Web Service"
4. Connect your GitHub repo
5. Add MongoDB database
6. Set environment variables
7. Deploy!

### VPS (DigitalOcean, Linode, etc.)

```bash
# On your VPS
git clone https://github.com/YOUR_USERNAME/Dicsord--The-Discord-Alternative-.git
cd Dicsord--The-Discord-Alternative-
npm install
cp .env.example .env
# Edit .env with production values
pm2 start server-integrated.js --name dicsord
pm2 save
pm2 startup
```

---

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Servers
- `GET /api/servers` - List user's servers
- `POST /api/servers` - Create server
- `GET /api/servers/:id` - Get server details

### Channels
- `GET /api/servers/:serverId/channels` - List channels
- `POST /api/channels` - Create channel

### Messages
- `GET /api/channels/:channelId/messages` - Get messages (paginated)
- WebSocket: Real-time messaging

### Voice
- WebSocket `/webrtc` - WebRTC signaling

---

## 🔒 Privacy & Security

- **No tracking** - We don't collect analytics
- **No third-party services** - All data stays on your server
- **End-to-end encryption** - Planned for future release
- **Self-hostable** - You control everything
- **Open source** - Audit the code anytime

---

## 🗺️ Roadmap

- [x] Text messaging
- [x] Voice channels
- [x] User authentication
- [x] Server/channel structure
- [ ] End-to-end encryption
- [ ] File sharing
- [ ] Video chat
- [ ] Screen sharing
- [ ] Mobile apps
- [ ] Message search
- [ ] Emoji reactions
- [ ] Thread replies
- [ ] Role-based permissions
- [ ] Bot API

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built in response to Discord's invasive ID verification requirements
- Inspired by the need for privacy-focused communication tools
- Thanks to all contributors and users who value digital privacy

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/marar-jr/Dicsord--The-Discord-Alternative-/issues)
- **Discussions**: [GitHub Discussions](https://github.com/marar-jr/Dicsord--The-Discord-Alternative-/discussions)
- **Twitter**: Share your thoughts with #Dicsord

---

## ⚠️ Disclaimer

This is an independent project and is not affiliated with Discord Inc. in any way.

---

**Built with ❤️ for privacy**

**A Foveated Production ⚡**
