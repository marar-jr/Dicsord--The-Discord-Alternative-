# Dicsord - The Privacy-First Discord Alternative

> **A Foveated Production ⚡**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://dicsord-the-discord-alternative.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org)

## 🔥 Try It Live

**[https://dicsord-the-discord-alternative.onrender.com](https://dicsord-the-discord-alternative.onrender.com)**

---

## 🎯 Why Dicsord?

In an era where major platforms require:
- ❌ Phone number verification
- ❌ Government ID uploads
- ❌ Constant data collection
- ❌ Opaque privacy policies

**Dicsord offers a different approach:**
- ✅ **Zero ID requirements** - Just username and password
- ✅ **No phone verification** - Your privacy matters
- ✅ **Self-hostable** - Own your data, run your own server
- ✅ **100% Open Source** - Audit the code, verify there's no tracking
- ✅ **Full voice chat** - WebRTC-powered, peer-to-peer
- ✅ **No hidden data collection** - We don't sell your information

### The Problem with Mainstream Platforms

Major communication platforms have increasingly demanded personal identification:
- ID scans for "verification"
- Phone numbers tied to real identity
- Centralized data collection
- Unknown data retention policies
- No control over your own information

**Dicsord puts control back in YOUR hands.**

---

## 🚀 Built by a Complete Beginner (With AI!)

**Full transparency:** I had ZERO coding experience before starting this project.

This entire application was built using:
- 💬 **Claude (Anthropic's AI)** - My coding teacher and partner
- 📚 **Trial and error** - Lots of it!
- 🔧 **Persistence** - Hours of debugging and learning

**Why share this?**
- To show that **ANYONE can build meaningful software** in 2025
- To demonstrate the power of AI-assisted development
- To encourage others who think "I could never code that"

**If I can build this with no experience, so can you.**

---

## ✨ Features

### Current Features
- 🔐 **Secure Authentication** - JWT-based, no personal data required
- 💬 **Real-time Messaging** - WebSocket-powered instant communication
- 🎤 **Voice Chat** - WebRTC peer-to-peer audio
- 📁 **File Sharing** - Share files securely with your community
- 🏠 **Server Creation** - Create and manage your own spaces
- 👥 **User Management** - Role-based permissions
- 🌙 **Dark Mode** - Easy on the eyes
- 📱 **Responsive Design** - Works on all devices

### Privacy Features
- 🔒 **No tracking scripts** - Zero analytics, zero fingerprinting
- 🚫 **No third-party services** - Everything self-contained
- 🔓 **Open source code** - Verify there's no backdoors
- 💾 **Your data, your server** - Self-host option available
- 🔐 **Encrypted connections** - HTTPS/WSS only

---

## 🛠️ Tech Stack

- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Real-time:** WebSocket (ws)
- **Voice:** WebRTC
- **Authentication:** JWT
- **Deployment:** Render.com

---

## 🚀 Quick Start

### Try the Live Demo
Visit **[https://dicsord-the-discord-alternative.onrender.com](https://dicsord-the-discord-alternative.onrender.com)**

### Run Locally

```bash
# Clone the repository
git clone https://github.com/marar-jr/Dicsord--The-Discord-Alternative-.git
cd Dicsord--The-Discord-Alternative-

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your settings:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_SECRET (any secure random string)

# Start the server
node server-integrated.js
```

Visit `http://localhost:3000`

### Deploy Your Own Instance

**Render.com (Recommended - Free):**
1. Fork this repository
2. Sign up at [render.com](https://render.com)
3. Create new Web Service
4. Connect your GitHub repo
5. Add environment variables:
   - `MONGODB_URI` - Get free MongoDB at [MongoDB Atlas](https://cloud.mongodb.com)
   - `JWT_SECRET` - Any secure random string
   - `NODE_ENV` - `production`
6. Deploy!

**Railway.app:**
1. Fork this repository
2. Sign up at [railway.app](https://railway.app)
3. Create new project from GitHub
4. Add MongoDB service
5. Add environment variables (same as above)
6. Deploy!

---

## 🤝 Contributing

**We need YOUR help to make Dicsord better!**

Whether you're:
- A beginner learning to code (like I was!)
- An experienced developer
- A designer
- A privacy advocate
- Just someone with ideas

**Your contributions are welcome!**

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit (`git commit -m 'Add amazing feature'`)
5. Push to your branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Areas We Need Help With

- 🎨 **UI/UX Design** - Make it beautiful!
- 🔐 **Security Audits** - Find vulnerabilities
- 📱 **Mobile Apps** - Native iOS/Android versions
- 🌍 **Internationalization** - Translate to other languages
- 📚 **Documentation** - Improve guides and tutorials
- 🐛 **Bug Fixes** - Help squash issues
- ✨ **New Features** - See roadmap below

---

## 🗺️ Roadmap

### Phase 1 - Core Functionality ✅
- [x] User authentication
- [x] Real-time messaging
- [x] Voice chat
- [x] Server creation
- [x] Basic deployment

### Phase 2 - Enhanced Features 🚧
- [ ] Group video calls
- [ ] Screen sharing
- [ ] Custom emoji/reactions
- [ ] Message editing/deletion
- [ ] User profiles
- [ ] Direct messages

### Phase 3 - Advanced Privacy 🔮
- [ ] End-to-end encryption
- [ ] Self-destructing messages
- [ ] Anonymous mode
- [ ] Tor integration
- [ ] Decentralized architecture (P2P)

### Phase 4 - Platform Expansion 🌟
- [ ] Mobile apps (iOS/Android)
- [ ] Desktop apps (Electron)
- [ ] Browser extension
- [ ] API for third-party integrations
- [ ] Plugin system

---

## 📖 Documentation

### API Endpoints

```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/servers          - Get user's servers
POST   /api/servers          - Create new server
GET    /api/messages/:id     - Get channel messages
POST   /api/messages         - Send message
```

### WebSocket Events

```
connection       - Client connects
join-server      - Join server room
leave-server     - Leave server room
send-message     - Send chat message
voice-offer      - WebRTC voice offer
voice-answer     - WebRTC voice answer
ice-candidate    - WebRTC ICE candidate
```

---

## 🔒 Privacy & Security

### What We DON'T Collect
- ❌ No phone numbers
- ❌ No government IDs
- ❌ No real names required
- ❌ No location data
- ❌ No tracking cookies
- ❌ No analytics/telemetry
- ❌ No third-party integrations

### What We DO
- ✅ Hash all passwords (bcrypt)
- ✅ Use secure JWT tokens
- ✅ Force HTTPS connections
- ✅ Allow self-hosting
- ✅ Open source code for auditing
- ✅ Minimal data retention

### Security Best Practices
- Always use HTTPS in production
- Keep dependencies updated
- Use strong JWT secrets
- Enable MongoDB authentication
- Regular security audits welcome!

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**What this means:**
- ✅ Use commercially
- ✅ Modify freely
- ✅ Distribute
- ✅ Private use
- ❌ No liability/warranty

---

## 🙏 Acknowledgments

- **Claude (Anthropic)** - For being an incredible AI coding partner and teacher
- **Open Source Community** - For all the libraries and tools
- **You** - For caring about privacy and considering alternatives

---

## 📞 Support & Community

- 🐛 **Issues:** [GitHub Issues](https://github.com/marar-jr/Dicsord--The-Discord-Alternative-/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/marar-jr/Dicsord--The-Discord-Alternative-/discussions)
- 🐦 **Twitter:** Share your instance! Tag: #Dicsord

---

## 🎯 The Bottom Line

In a world where privacy is increasingly rare, **Dicsord offers a choice.**

You shouldn't have to:
- Upload government IDs to chat with friends
- Give your phone number to a corporation
- Trust that your data won't be sold
- Accept opaque privacy policies

**Dicsord is different. Dicsord is yours.**

Built with 💜 by a complete beginner who believes in privacy.

**A Foveated Production ⚡**

---

### Star ⭐ this repo if you believe in privacy-first communication!
