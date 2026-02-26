# SkillHood - Skill Exchange Platform

A community-driven platform for exchanging skills and knowledge locally. Connect with people nearby to teach what you know and learn what you want.

## 🌟 Features

- **User Authentication** - Secure registration and login
- **Skill Management** - Add skills you offer and want to learn
- **Location-Based Matching** - Find nearby users with complementary skills
- **Swap Requests** - Send and receive skill exchange requests
- **Real-time Messaging** - Chat with matched users
- **Admin Dashboard** - Manage users and monitor platform activity

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB (v4.4+)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/skillhood.git
cd skillhood
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Setup Frontend**
```bash
# Open index.html in a browser or use a local server
npx http-server -p 3000
```

4. **Start MongoDB**
```bash
mongod
```

### Environment Configuration

Copy `backend/.env.example` to `backend/.env` and configure:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/skillhood
JWT_SECRET=your_random_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

## 📁 Project Structure

```
skillhood/
├── backend/          # Node.js/Express API
│   ├── config/       # Database configuration
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Auth & validation
│   ├── models/       # MongoDB models
│   ├── routes/       # API routes
│   └── server.js     # Entry point
├── frontend/         # HTML/CSS/JS frontend
├── docs/             # Documentation
└── README.md
```

## 🔗 API Documentation

See [backend/README.md](backend/README.md) for complete API documentation.

## 🧪 Testing

```bash
cd backend
npm test
```

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

## 📧 Contact

For questions or support, open an issue on GitHub.
