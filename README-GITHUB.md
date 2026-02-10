# 🎮 Dicsord - Privacy-Focused Discord Alternative

<div align="center">

![Dicsord Logo](https://via.placeholder.com/150x150.png?text=Dicsord)

**A real-time chat application with voice channels - No ID verification required!**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)](https://www.mongodb.com/)
[![WebRTC](https://img.shields.io/badge/WebRTC-Enabled-blue)](https://webrtc.org/)

[Features](#-features) • [Demo](#-demo) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 🌟 Why Dicsord?

Built as a response to Discord's invasive ID verification requirements. Dicsord gives you the same great features without compromising your privacy.

### ✨ Features

- 🔒 **Privacy First** - No phone verification, no ID scanning, no tracking
- 💬 **Real-time Messaging** - WebSocket-based instant communication
- 🎤 **Voice Channels** - WebRTC peer-to-peer voice chat
- 🏢 **Server Organization** - Multiple servers with categorized channels
- 👥 **User Presence** - See who's online with status indicators
- 🐳 **Docker Support** - One-command deployment
- 🔐 **Self-Hostable** - Full control over your data
- 🌐 **Open Source** - Audit the code yourself

## 📸 Screenshots

<div align="center">

### Main Chat Interface
![Chat Interface](https://via.placeholder.com/800x450.png?text=Chat+Interface+Screenshot)

### Voice Channels
![Voice Channels](https://via.placeholder.com/800x450.png?text=Voice+Channels+Screenshot)

### Server Management
![Server List](https://via.placeholder.com/800x450.png?text=Server+Management+Screenshot)

</div>

## 🎥 Demo

**[Live Demo](https://dicsord-demo.example.com)** | **[Video Tutorial](https://youtube.com/example)**

> Note: Replace these with your actual demo links

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **MongoDB** 5+ ([Install Guide](https://docs.mongodb.com/manual/installation/))
- Modern browser with WebRTC support

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/dicsord.git
cd dicsord

# 2. Install dependencies
npm install

# 3. Setup MongoDB (choose one)

# Option A: Local MongoDB
brew install mongodb-community  # macOS
sudo apt-get install mongodb    # Ubuntu/Debian
brew services start mongodb-community

# Option B: Docker MongoDB
docker run -d -p 27017:27017 --name dicsord-mongo mongo:7

# 4. Configure environment
cp .env.example .env
nano .env  # Edit and change JWT_SECRET!

# 5. Start the server
node server-integrated.js

# 6. Open the app
# Open discord-alternative.html in your browser
# OR serve it properly:
npx http-server -p 8000
# Then visit: http://localhost:8000/discord-alternative.html
```

### 🐳 Docker Deployment (Recommended)

```bash
# Start everything with one command
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

## 📖 Documentation

### Project Structure

```
dicsord/
├── discord-alternative.html  # Frontend UI
├── server-integrated.js      # Main server (WebSocket + WebRTC)
├── client.js                 # Frontend client library
├── package.json              # Dependencies
├── docker-compose.yml        # Docker orchestration
├── Dockerfile                # Container image
├── .env.example              # Environment template
└── README.md                 # This file
```

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### Servers & Channels
- `GET /api/servers` - Get user's servers
- `POST /api/servers` - Create new server
- `GET /api/servers/:serverId/channels` - Get channels
- `GET /api/servers/:serverId/members` - Get members

#### Messages
- `GET /api/channels/:channelId/messages` - Get messages (supports pagination)

### WebSocket Events

**Client → Server:**
```javascript
{ type: 'authenticate', token: 'jwt-token' }
{ type: 'message', channelId: 'id', content: 'text' }
{ type: 'typing', channelId: 'id' }
{ type: 'voice_state', channelId: 'id', connected: true }
{ type: 'status_change', status: 'online' }
```

**Server → Client:**
```javascript
{ type: 'authenticated', userId: 'id' }
{ type: 'new_message', message: {...} }
{ type: 'typing', userId: 'id', channelId: 'id' }
{ type: 'voice_state', ... }
{ type: 'user_status', userId: 'id', status: 'online' }
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
NODE_ENV=production
JWT_SECRET=your-super-secret-key-change-this  # ⚠️ CHANGE THIS!
MONGODB_URI=mongodb://localhost:27017/dicsord
```

## 🛡️ Security

### Production Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Enable HTTPS/TLS encryption
- [ ] Configure firewall rules (only allow 80, 443, 27017)
- [ ] Set up rate limiting (already included)
- [ ] Enable CORS only for your domain
- [ ] Use environment variables for all secrets
- [ ] Implement MongoDB backup strategy
- [ ] Add monitoring and logging (PM2, DataDog, etc.)
- [ ] Keep dependencies updated (`npm audit`)

### HTTPS Setup (Let's Encrypt)

```bash
# Install certbot
sudo apt-get install certbot

# Get certificate
sudo certbot certonly --standalone -d yourdomain.com

# Certificate will be at:
# /etc/letsencrypt/live/yourdomain.com/fullchain.pem
# /etc/letsencrypt/live/yourdomain.com/privkey.pem
```

### Process Manager (PM2)

```bash
npm install -g pm2

# Start application
pm2 start server-integrated.js --name dicsord

# Auto-restart on reboot
pm2 startup
pm2 save

# Monitor
pm2 monit
```

## 📊 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **WebSocket (ws)** - Real-time communication
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **Vanilla JavaScript** - No framework overhead
- **WebSocket API** - Real-time chat
- **WebRTC API** - Peer-to-peer voice
- **CSS3** - Modern styling

### Infrastructure
- **Docker** - Containerization
- **Nginx** - Reverse proxy (optional)

## 🎯 Roadmap

### Current Version (v1.0)
- [x] Real-time messaging
- [x] Voice channels
- [x] User authentication
- [x] Server/channel organization
- [x] Docker support

### Coming Soon
- [ ] End-to-end encryption
- [ ] File sharing & attachments
- [ ] Video chat
- [ ] Screen sharing
- [ ] Mobile apps (React Native)
- [ ] Message search
- [ ] Emoji reactions
- [ ] Thread replies
- [ ] Role-based permissions
- [ ] Bot API
- [ ] Message editing & deletion
- [ ] User profiles
- [ ] Dark/light theme toggle

## 🔒 Privacy Comparison

| Feature | Discord | Dicsord |
|---------|---------|---------|
| ID Verification | ✅ Required | ❌ Never |
| Phone Verification | ✅ Required | ❌ Never |
| Data Collection | ✅ Extensive | ❌ Minimal |
| Self-Hostable | ❌ No | ✅ Yes |
| Open Source | ❌ No | ✅ Yes |
| Analytics Tracking | ✅ Yes | ❌ No |
| End-to-End Encryption | ❌ No | 🔜 Coming |

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Setup

```bash
# Clone your fork
git clone https://github.com/yourusername/dicsord.git
cd dicsord

# Install dependencies
npm install

# Start in development mode
npm run dev
```

### Code Style

- Use ESLint for JavaScript linting
- Follow existing code patterns
- Write meaningful commit messages
- Add tests for new features

## 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/yourusername/dicsord/issues) with:

- Description of the bug
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)
- Your environment (OS, Node version, browser)

## 🔐 Security Issues

Found a security vulnerability? Please **do not** create a public issue. Instead:

📧 Email: security@dicsord.example

We take security seriously and will respond within 48 hours.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Dicsord Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 💖 Support

If you find this project useful, please consider:

- ⭐ Starring the repository
- 🐦 Sharing on Twitter
- 📝 Writing a blog post
- ☕ [Buy me a coffee](https://buymeacoffee.com/example)

## 🙏 Acknowledgments

- Built in response to Discord's invasive verification requirements
- Inspired by the open-source community
- Thanks to all contributors!

## 📞 Contact

- **Twitter**: [@yourusername](https://twitter.com/yourusername)
- **Discord**: Join our [Dicsord server](https://dicsord.example.com/invite) (yes, we use our own platform!)
- **Email**: contact@dicsord.example

---

<div align="center">

**Built with ❤️ for privacy**

Made by [Your Name](https://github.com/yourusername) and [contributors](https://github.com/yourusername/dicsord/contributors)

</div>
