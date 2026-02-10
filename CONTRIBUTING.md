# Contributing to Dicsord

First off, thank you for considering contributing to Dicsord! It's people like you that make Dicsord a great tool for privacy-focused communication.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by a simple principle: **Be respectful and constructive**. By participating, you are expected to uphold this standard.

### Our Standards

- **Be welcoming** to newcomers
- **Be respectful** of differing viewpoints
- **Accept constructive criticism** gracefully
- **Focus on what's best** for the community
- **Show empathy** towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**When submitting a bug report, include:**
- A clear, descriptive title
- Exact steps to reproduce the problem
- Expected vs. actual behavior
- Screenshots if applicable
- Your environment (OS, Node version, browser)

**Example:**
```markdown
**Bug Description:**
Server crashes when joining voice channel with >10 users

**Steps to Reproduce:**
1. Create a voice channel
2. Have 11 users join simultaneously
3. Server crashes with error X

**Expected Behavior:**
Server should handle 11+ users gracefully

**Environment:**
- OS: Ubuntu 22.04
- Node: v18.17.0
- Browser: Chrome 119
```

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:
- Clear description of the feature
- Use cases and benefits
- Potential implementation approach
- Mockups/diagrams if applicable

### Your First Code Contribution

Unsure where to begin? Look for issues labeled:
- `good first issue` - Simple issues for newcomers
- `help wanted` - Issues we need help with
- `documentation` - Documentation improvements

## Development Setup

### Prerequisites

- Node.js 18+
- MongoDB 5+
- Git

### Initial Setup

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/dicsord.git
cd dicsord

# 3. Add upstream remote
git remote add upstream https://github.com/original-author/dicsord.git

# 4. Install dependencies
npm install

# 5. Setup environment
cp .env.example .env
# Edit .env with your settings

# 6. Start MongoDB
docker run -d -p 27017:27017 --name dicsord-mongo-dev mongo:7

# 7. Run the development server
npm run dev
```

### Project Structure

```
dicsord/
├── discord-alternative.html  # Frontend UI
├── server-integrated.js      # Main server
├── client.js                 # Client library
├── package.json              # Dependencies
├── README.md                 # Documentation
└── tests/                    # Test files
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/auth.test.js

# Run with coverage
npm run test:coverage
```

## Pull Request Process

### 1. Create a Feature Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Write clean, documented code
- Follow the style guidelines
- Add tests for new features
- Update documentation

### 3. Commit Your Changes

Use clear, descriptive commit messages:

```bash
# Good commit messages
git commit -m "Add end-to-end encryption for messages"
git commit -m "Fix voice channel disconnect bug"
git commit -m "Update README with Docker setup"

# Bad commit messages
git commit -m "Fixed stuff"
git commit -m "Update"
git commit -m "asdfasdf"
```

**Commit Message Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Example:**
```
feat: Add file sharing to channels

- Implemented file upload API endpoint
- Added drag-and-drop UI for file uploads
- Limited file size to 10MB
- Supported formats: images, PDFs, text files

Closes #123
```

### 4. Push and Create PR

```bash
# Push to your fork
git push origin feature/your-feature-name

# Go to GitHub and create a Pull Request
```

### 5. PR Requirements

Your PR should:
- [ ] Have a clear title and description
- [ ] Reference related issues (e.g., "Fixes #123")
- [ ] Pass all tests
- [ ] Include new tests if adding features
- [ ] Update documentation
- [ ] Follow code style guidelines

### PR Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How did you test this? What cases did you cover?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## Style Guidelines

### JavaScript Style

We use ESLint. Key points:

```javascript
// Use ES6+ features
const myFunction = async () => {
    const result = await someAsyncOperation();
    return result;
};

// Descriptive variable names
const userAuthToken = generateToken();  // Good
const t = generateToken();              // Bad

// Comments for complex logic
// Calculate exponential backoff delay
const delay = Math.min(1000 * Math.pow(2, retryCount), 30000);

// Use async/await over promises
// Good
const data = await fetchData();

// Avoid
fetchData().then(data => { ... });
```

### Code Organization

```javascript
// File structure
// 1. Imports
const express = require('express');
const jwt = require('jsonwebtoken');

// 2. Constants
const MAX_RETRIES = 3;
const TIMEOUT = 5000;

// 3. Helper functions
function validateEmail(email) { ... }

// 4. Main logic
class Server { ... }

// 5. Exports
module.exports = Server;
```

### CSS Style

```css
/* Use meaningful class names */
.message-container { }  /* Good */
.mc { }                 /* Bad */

/* Group related properties */
.button {
    /* Positioning */
    position: relative;
    
    /* Box model */
    display: flex;
    padding: 10px;
    
    /* Typography */
    font-size: 16px;
    
    /* Visual */
    background: blue;
    border-radius: 4px;
}
```

### Documentation Style

```javascript
/**
 * Send a message to a channel
 * 
 * @param {string} channelId - The channel ID
 * @param {string} content - Message content
 * @param {Object} options - Additional options
 * @param {boolean} options.encrypted - Whether to encrypt the message
 * @returns {Promise<Object>} The created message object
 * @throws {Error} If channel doesn't exist
 */
async function sendMessage(channelId, content, options = {}) {
    // Implementation
}
```

## Testing Guidelines

### Writing Tests

```javascript
describe('Authentication', () => {
    describe('register', () => {
        it('should create a new user with valid credentials', async () => {
            const user = await register({
                username: 'testuser',
                email: 'test@example.com',
                password: 'SecurePass123!'
            });
            
            expect(user).toHaveProperty('id');
            expect(user.username).toBe('testuser');
        });
        
        it('should reject duplicate usernames', async () => {
            await register({ username: 'duplicate', ... });
            
            await expect(
                register({ username: 'duplicate', ... })
            ).rejects.toThrow('User already exists');
        });
    });
});
```

### Test Coverage

Aim for:
- **80%+** overall coverage
- **100%** for critical security code
- **100%** for API endpoints

## Security Considerations

When contributing, keep in mind:

### Input Validation

```javascript
// Always validate and sanitize input
const { body, validationResult } = require('express-validator');

app.post('/api/message', [
    body('content').trim().isLength({ min: 1, max: 2000 }),
    body('channelId').isMongoId()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Process request
});
```

### Authentication

```javascript
// Never commit secrets
const JWT_SECRET = process.env.JWT_SECRET;  // Good
const JWT_SECRET = 'hardcoded-secret';      // NEVER DO THIS

// Use proper password hashing
const hash = await bcrypt.hash(password, 10);  // Good
const hash = md5(password);                    // Bad
```

### XSS Prevention

```javascript
// Escape user content in frontend
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

## Community

### Getting Help

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Discord**: Join our community server (yes, we use Dicsord!)
- **Twitter**: Follow [@dicsord](https://twitter.com/dicsord)

### Recognition

Contributors are recognized in:
- README.md contributors section
- CHANGELOG.md for each release
- GitHub contributors page

## Questions?

Don't hesitate to ask! You can:
- Open a GitHub Discussion
- Comment on a related issue
- Join our community server

Thank you for contributing to Dicsord! 🎉
