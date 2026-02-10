# 🚀 QUICK START GUIDE - After Extracting the ZIP

## 📦 What You Just Downloaded

The ZIP file contains your complete Dicsord application. Here's what to do next:

---

## ✅ STEP-BY-STEP INSTRUCTIONS

### 1️⃣ Extract the ZIP File

**On Windows:**
- Right-click `dicsord-complete-v2.zip`
- Click "Extract All..."
- Choose a location (like `C:\Projects\dicsord`)
- Click "Extract"

**On Mac:**
- Double-click `dicsord-complete-v2.zip`
- It will create a `dicsord-complete-v2` folder

**On Linux:**
```bash
unzip dicsord-complete-v2.zip -d dicsord
cd dicsord
```

---

### 2️⃣ What's Inside?

After extracting, you should see these files:

```
dicsord/
├── discord-alternative.html   ← Main app (open this in browser)
├── landing-page.html          ← Marketing website
├── server-integrated.js       ← Backend server
├── client.js                  ← WebSocket/WebRTC client
├── package.json               ← Dependencies list
├── docker-compose.yml         ← Docker setup
├── Dockerfile                 ← Docker image
├── .env.example               ← Environment config template
├── .gitignore                 ← Git ignore file
├── README.md                  ← Documentation
├── README-GITHUB.md           ← Enhanced README for GitHub
├── LICENSE                    ← MIT License
└── CONTRIBUTING.md            ← Contribution guide
```

---

### 3️⃣ Try the Demo (Quickest Way)

**Just want to see the UI?**

1. Navigate to the extracted folder
2. Double-click `discord-alternative.html`
3. It opens in your browser!

⚠️ **Note:** The backend features (real chat, voice) won't work yet - you need to run the server first (see Step 4).

---

### 4️⃣ Run the Full App (With Backend)

#### **Prerequisites:** Install These First

1. **Node.js** - Download from [nodejs.org](https://nodejs.org/)
   - Get version 18 or higher
   - Verify: Open terminal/command prompt and type:
     ```bash
     node --version
     ```
     Should show `v18.x.x` or higher

2. **MongoDB** - Choose one option:

   **Option A: Docker (Easiest)**
   ```bash
   docker run -d -p 27017:27017 --name dicsord-mongo mongo:7
   ```

   **Option B: Install MongoDB**
   - Windows: [Download MongoDB](https://www.mongodb.com/try/download/community)
   - Mac: `brew install mongodb-community`
   - Linux: `sudo apt-get install mongodb`

---

#### **Setup & Run**

**Open Terminal/Command Prompt** in your extracted folder, then:

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Edit .env file - IMPORTANT!
# Open .env in any text editor and change:
# JWT_SECRET=your-secret-key-change-this
# to something random like:
# JWT_SECRET=aB3$xK9#mL2@pQ7!vR5*wN8&

# 4. Start the server
node server-integrated.js
```

**You should see:**
```
╔════════════════════════════════════════╗
║  Dicsord Server Running                ║
║  Port: 3000                            ║
║  MongoDB: Connected                    ║
║                                        ║
║  A Foveated Production ⚡              ║
╚════════════════════════════════════════╝
```

**5. Open the app:**
- Open your browser
- Go to: `http://localhost:3000/discord-alternative.html`
- OR just double-click `discord-alternative.html`

---

### 5️⃣ Using the App

1. **Register an account** (no email verification needed!)
2. **Create a server** or join one
3. **Text channels** - Click to chat
4. **Voice channels** - Click to join voice chat
5. **Send messages** - Type and press Enter

---

### 6️⃣ Deploy to GitHub

Want to share this with the world?

```bash
# In your dicsord folder:

# 1. Initialize git
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: Dicsord - A Foveated Production"

# 4. Create a new repository on GitHub
# Go to: github.com/new
# Name it: dicsord
# Don't initialize with anything

# 5. Connect and push
git remote add origin https://github.com/YOUR_USERNAME/dicsord.git
git branch -M main
git push -u origin main
```

**Then replace the README:**
1. Delete the auto-generated `README.md` on GitHub
2. Rename `README-GITHUB.md` to `README.md` in your folder
3. Update your GitHub username in the README
4. Commit and push:
   ```bash
   git add README.md
   git commit -m "Add complete README"
   git push
   ```

---

### 7️⃣ Deploy the Landing Page

**Free hosting on GitHub Pages:**

```bash
# Create a separate branch for the website
git checkout --orphan gh-pages
git reset --hard

# Copy only the landing page
cp landing-page.html index.html

# Commit and push
git add index.html
git commit -m "Add landing page"
git push origin gh-pages

# Go back to main branch
git checkout main
```

**Your site will be live at:**
`https://YOUR_USERNAME.github.io/dicsord`

---

## 🎯 Common Issues & Solutions

### "npm: command not found"
→ You need to install Node.js from [nodejs.org](https://nodejs.org/)

### "MongoNetworkError: failed to connect"
→ MongoDB isn't running. Start it with:
```bash
docker run -d -p 27017:27017 --name dicsord-mongo mongo:7
```

### "Port 3000 is already in use"
→ Change the port in `.env`:
```
PORT=3001
```

### Can't access http://localhost:3000
→ Make sure the server is running (see the startup banner)

### Voice chat not working
→ Allow microphone permissions in your browser

---

## 📚 Next Steps

1. **Customize** - Change colors, add features
2. **Deploy** - Host on Railway, Render, or your own server
3. **Share** - Tweet it out!
4. **Contribute** - Make it even better

---

## 💡 Pro Tips

**Development Mode:**
```bash
npm install -g nodemon
nodemon server-integrated.js
# Auto-restarts when you change code
```

**Production Deployment:**
```bash
# Use PM2 for production
npm install -g pm2
pm2 start server-integrated.js --name dicsord
pm2 save
pm2 startup
```

**Docker Deployment (Full Stack):**
```bash
docker-compose up -d
# Starts everything: MongoDB, Backend, Nginx
```

---

## 🆘 Need Help?

- **GitHub Issues:** Report bugs
- **GitHub Discussions:** Ask questions
- **README.md:** Full documentation
- **CONTRIBUTING.md:** How to contribute

---

## ⚡ You're All Set!

You now have a fully functional Discord alternative!

**A Foveated Production** 🚀

---

## 🐦 Ready to Share?

Tweet this:
```
I just built Dicsord - a privacy-focused Discord alternative! 🔒

✅ No ID verification
✅ Self-hostable  
✅ Full voice chat
✅ 100% open source

Check it out: [your-github-link]

A Foveated Production ⚡
```

Good luck! 🎉
