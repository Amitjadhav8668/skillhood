================================================================================
                    SKILLHOOD PROJECT - COMPLETE AI GUIDE
                  Everything You Need to Know About This Project
================================================================================

PROJECT LOCATION: C:\skillhood

================================================================================
                            TABLE OF CONTENTS
================================================================================

1. PROJECT OVERVIEW
2. QUICK START GUIDE
3. PROJECT ARCHITECTURE
4. FILE STRUCTURE
5. TECHNOLOGY STACK
6. DATABASE SCHEMA
7. API ENDPOINTS
8. FRONTEND PAGES
9. KEY FEATURES
10. CODE PATTERNS
11. AUTHENTICATION FLOW
12. MATCHING ALGORITHM
13. COMMON TASKS
14. TROUBLESHOOTING
15. DEPLOYMENT GUIDE

================================================================================
                          1. PROJECT OVERVIEW
================================================================================

PROJECT NAME: SkillHood
TYPE: Full-Stack Web Application
PURPOSE: Location-based skill exchange platform without monetary transactions

DESCRIPTION:
SkillHood connects people who want to exchange skills based on geographic 
proximity. Users can offer skills they know and request skills they want to 
learn. The platform matches users based on complementary skills, distance, 
and proficiency levels.

KEY CONCEPT:
- User A offers "Web Development" and wants "Guitar"
- User B offers "Guitar" and wants "Web Development"
- System matches them and facilitates skill exchange

TECH STACK:
- Frontend: HTML5, CSS3, Vanilla JavaScript, Leaflet.js
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose ODM
- Authentication: JWT (JSON Web Tokens)
- Security: Bcrypt for password hashing

DESIGN STYLE:
- Glassmorphism (frosted glass effect)
- Dark blue/navy to teal/cyan gradients
- Modern, premium aesthetic
- Responsive design (desktop-first)


================================================================================
                        2. QUICK START GUIDE
================================================================================

PREREQUISITES:
- Node.js v18+ installed
- MongoDB installed and running
- Modern web browser

SETUP STEPS:

1. BACKEND SETUP:
   cd C:\skillhood\backend
   npm install
   
   Create .env file:
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/skillhood
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   
   Start MongoDB:
   mongod
   
   Run backend:
   npm run dev
   
   Backend runs on: http://localhost:5000

2. FRONTEND SETUP:
   cd C:\skillhood
   npm install
   npm run dev
   
   Frontend runs on: http://localhost:3000

3. ACCESS APPLICATION:
   Open browser: http://localhost:3000
   Register new account
   Start using the platform

DEFAULT ADMIN CREDENTIALS (if seeded):
Email: admin@skillhood.com
Password: admin123


================================================================================
                       3. PROJECT ARCHITECTURE
================================================================================

ARCHITECTURE PATTERN: Three-Tier Architecture

┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION TIER                         │
│  (Frontend - HTML/CSS/JavaScript)                           │
│  - User Interface                                           │
│  - Client-side validation                                   │
│  - Dynamic rendering                                        │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/HTTPS
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION TIER                          │
│  (Backend - Node.js/Express)                                │
│  - RESTful API                                              │
│  - Business logic                                           │
│  - Authentication/Authorization                             │
│  - Matching algorithms                                      │
└─────────────────────────────────────────────────────────────┘
                            ↕ Mongoose
┌─────────────────────────────────────────────────────────────┐
│                       DATA TIER                              │
│  (MongoDB)                                                  │
│  - User data                                                │
│  - Skills data                                              │
│  - Requests data                                            │
│  - Messages data                                            │
└─────────────────────────────────────────────────────────────┘

BACKEND ARCHITECTURE (MVC Pattern):

Routes → Middleware → Controllers → Models → Database

Example Flow:
1. Client sends POST /api/auth/login
2. Route receives request
3. Middleware validates input
4. Controller processes login logic
5. Model queries database
6. Response sent back to client


================================================================================
                        4. FILE STRUCTURE
================================================================================

C:\skillhood\
│
├── Frontend Files (Root Directory)
│   ├── index.html              # Landing page
│   ├── login.html              # Login page
│   ├── register.html           # Registration page
│   ├── dashboard.html          # User dashboard
│   ├── profile.html            # User profile
│   ├── profile-setup.html      # Initial profile setup
│   ├── skills.html             # Skill management
│   ├── map.html                # Interactive map
│   ├── requests.html           # Request management
│   ├── messages.html           # Messaging interface
│   ├── admin.html              # Admin panel
│   ├── forgot-password.html    # Password recovery
│   ├── styles.css              # Global styles
│   ├── auth.js                 # Authentication logic
│   ├── package.json            # Frontend dependencies
│   └── README.md               # Frontend documentation
│
├── backend/                    # Backend API
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   │
│   ├── controllers/           # Business logic
│   │   ├── authController.js  # Auth operations
│   │   ├── userController.js  # User operations
│   │   ├── skillController.js # Skill operations
│   │   ├── requestController.js # Request operations
│   │   ├── messageController.js # Message operations
│   │   └── adminController.js # Admin operations
│   │
│   ├── middleware/
│   │   └── auth.js            # JWT verification
│   │
│   ├── models/                # Database schemas
│   │   ├── User.js            # User model
│   │   ├── Skill.js           # Skill model
│   │   ├── SwapRequest.js     # Request model
│   │   └── Message.js         # Message model
│   │
│   ├── routes/                # API routes
│   │   ├── authRoutes.js      # Auth endpoints
│   │   ├── userRoutes.js      # User endpoints
│   │   ├── skillRoutes.js     # Skill endpoints
│   │   ├── requestRoutes.js   # Request endpoints
│   │   ├── messageRoutes.js   # Message endpoints
│   │   └── adminRoutes.js     # Admin endpoints
│   │
│   ├── utils/
│   │   └── generateToken.js   # JWT token generator
│   │
│   ├── .env                   # Environment variables
│   ├── server.js              # Entry point
│   ├── package.json           # Backend dependencies
│   └── README.md              # Backend documentation
│
└── Documentation Files
    ├── BLACKBOOK_SKILLHOOD.md # Academic project report
    └── AI_PROJECT_GUIDE.md    # This file


================================================================================
                        5. TECHNOLOGY STACK
================================================================================

FRONTEND TECHNOLOGIES:

1. HTML5
   - Semantic markup
   - Form validation attributes
   - Local storage API

2. CSS3
   - Custom properties (CSS variables)
   - Flexbox and Grid layouts
   - Backdrop-filter for glassmorphism
   - Media queries for responsiveness
   - Transitions and animations

3. JavaScript (ES6+)
   - Async/await for API calls
   - Fetch API for HTTP requests
   - DOM manipulation
   - Event handling
   - Local storage management

4. Leaflet.js v1.9+
   - Interactive maps
   - OpenStreetMap tiles
   - Marker management
   - Popup functionality

BACKEND TECHNOLOGIES:

1. Node.js v18+
   - JavaScript runtime
   - Event-driven architecture
   - Non-blocking I/O

2. Express.js v4.18+
   - Web framework
   - Routing
   - Middleware support
   - HTTP utilities

3. MongoDB v7.0+
   - NoSQL database
   - Document-oriented
   - Flexible schema
   - Geospatial queries

4. Mongoose v8.0+
   - ODM for MongoDB
   - Schema validation
   - Query building
   - Middleware hooks

SECURITY & AUTHENTICATION:

1. JSON Web Tokens (JWT) v9.0+
   - Stateless authentication
   - Token-based auth
   - Payload encryption

2. Bcrypt.js v2.4+
   - Password hashing
   - Salt generation
   - Secure comparison

3. Express-validator v7.0+
   - Input validation
   - Sanitization
   - Custom rules

4. CORS v2.8+
   - Cross-origin requests
   - Security policies

DEVELOPMENT TOOLS:

1. Nodemon v3.0+
   - Auto-restart server
   - Development mode

2. Dotenv v16.3+
   - Environment variables
   - Configuration management

3. Live-server / http-server
   - Frontend development server
   - Hot reload


================================================================================
                        6. DATABASE SCHEMA
================================================================================

DATABASE NAME: skillhood

COLLECTIONS:

1. USERS COLLECTION
   Purpose: Store user accounts and profiles
   
   Schema:
   {
     _id: ObjectId,
     name: String (required),
     email: String (required, unique, lowercase),
     password: String (required, hashed, min 6 chars),
     city: String (required),
     latitude: Number (default: 0),
     longitude: Number (default: 0),
     bio: String (default: ""),
     availability: String (default: "Available Weekends"),
     role: String (enum: ['user', 'admin'], default: 'user'),
     createdAt: Date (default: Date.now)
   }
   
   Indexes:
   - email: unique index
   - location: 2dsphere index (for geospatial queries)
   
   Example Document:
   {
     "_id": "65f1a2b3c4d5e6f7g8h9i0j1",
     "name": "John Doe",
     "email": "john@example.com",
     "password": "$2a$10$hashed_password_here",
     "city": "San Francisco",
     "latitude": 37.7749,
     "longitude": -122.4194,
     "bio": "Full-stack developer passionate about teaching",
     "availability": "Weekends",
     "role": "user",
     "createdAt": "2024-01-15T10:30:00.000Z"
   }

2. SKILLS COLLECTION
   Purpose: Store skills users offer or want to learn
   
   Schema:
   {
     _id: ObjectId,
     userId: ObjectId (ref: 'User', required),
     name: String (required),
     description: String (default: ""),
     level: String (enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']),
     experience: String (default: ""),
     type: String (enum: ['offer', 'want'], required),
     createdAt: Date (default: Date.now)
   }
   
   Indexes:
   - userId: index
   - type: index
   - name: text index (for search)
   
   Example Document:
   {
     "_id": "65f1a2b3c4d5e6f7g8h9i0j2",
     "userId": "65f1a2b3c4d5e6f7g8h9i0j1",
     "name": "Web Development",
     "description": "HTML, CSS, JavaScript, React",
     "level": "Expert",
     "experience": "5 years professional experience",
     "type": "offer",
     "createdAt": "2024-01-15T11:00:00.000Z"
   }

3. SWAPREQUESTS COLLECTION
   Purpose: Store skill exchange requests between users
   
   Schema:
   {
     _id: ObjectId,
     fromUser: ObjectId (ref: 'User', required),
     toUser: ObjectId (ref: 'User', required),
     offeredSkill: String (required),
     requestedSkill: String (required),
     message: String (default: ""),
     status: String (enum: ['pending', 'accepted', 'rejected'], default: 'pending'),
     createdAt: Date (default: Date.now),
     updatedAt: Date (default: Date.now)
   }
   
   Indexes:
   - fromUser: index
   - toUser: index
   - status: index
   
   Example Document:
   {
     "_id": "65f1a2b3c4d5e6f7g8h9i0j3",
     "fromUser": "65f1a2b3c4d5e6f7g8h9i0j1",
     "toUser": "65f1a2b3c4d5e6f7g8h9i0j4",
     "offeredSkill": "Web Development",
     "requestedSkill": "Guitar",
     "message": "Hi! I'd love to exchange skills with you.",
     "status": "pending",
     "createdAt": "2024-01-16T09:00:00.000Z",
     "updatedAt": "2024-01-16T09:00:00.000Z"
   }

4. MESSAGES COLLECTION
   Purpose: Store messages between users
   
   Schema:
   {
     _id: ObjectId,
     requestId: ObjectId (ref: 'SwapRequest', required),
     senderId: ObjectId (ref: 'User', required),
     receiverId: ObjectId (ref: 'User', required),
     message: String (required),
     timestamp: Date (default: Date.now)
   }
   
   Indexes:
   - requestId: index
   - senderId, receiverId: compound index
   - timestamp: index
   
   Example Document:
   {
     "_id": "65f1a2b3c4d5e6f7g8h9i0j5",
     "requestId": "65f1a2b3c4d5e6f7g8h9i0j3",
     "senderId": "65f1a2b3c4d5e6f7g8h9i0j1",
     "receiverId": "65f1a2b3c4d5e6f7g8h9i0j4",
     "message": "When are you available for our first session?",
     "timestamp": "2024-01-17T14:30:00.000Z"
   }

RELATIONSHIPS:

User → Skills (One-to-Many)
- One user can have multiple skills

User → SwapRequests (One-to-Many as sender)
- One user can send multiple requests

User → SwapRequests (One-to-Many as receiver)
- One user can receive multiple requests

SwapRequest → Messages (One-to-Many)
- One request can have multiple messages

User → Messages (One-to-Many as sender)
- One user can send multiple messages

User → Messages (One-to-Many as receiver)
- One user can receive multiple messages


================================================================================
                        7. API ENDPOINTS
================================================================================

BASE URL: http://localhost:5000/api

AUTHENTICATION ENDPOINTS:

1. Register User
   POST /auth/register
   Access: Public
   Body: {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123",
     "city": "San Francisco",
     "latitude": 37.7749,
     "longitude": -122.4194
   }
   Response: {
     "success": true,
     "data": {
       "_id": "...",
       "name": "John Doe",
       "email": "john@example.com",
       "city": "San Francisco",
       "role": "user",
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     }
   }

2. Login User
   POST /auth/login
   Access: Public
   Body: {
     "email": "john@example.com",
     "password": "password123"
   }
   Response: {
     "success": true,
     "data": {
       "_id": "...",
       "name": "John Doe",
       "email": "john@example.com",
       "role": "user",
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
     }
   }

USER ENDPOINTS:

3. Get User Profile
   GET /users/profile
   Access: Private (requires JWT token)
   Headers: { "Authorization": "Bearer <token>" }
   Response: {
     "success": true,
     "data": {
       "user": { user object },
       "skills": [ array of skills ]
     }
   }

4. Update User Profile
   PUT /users/profile
   Access: Private
   Headers: { "Authorization": "Bearer <token>" }
   Body: {
     "name": "John Updated",
     "city": "New York",
     "bio": "Updated bio",
     "availability": "Weekdays",
     "latitude": 40.7128,
     "longitude": -74.0060
   }

5. Get Nearby Users
   GET /users/nearby
   Access: Private
   Headers: { "Authorization": "Bearer <token>" }
   Response: {
     "success": true,
     "data": [
       {
         "user": { user object },
         "distance": 5.2,
         "matchScore": 85,
         "matchingSkills": ["Web Development", "Guitar"]
       }
     ]
   }

SKILL ENDPOINTS:

6. Add Skill
   POST /skills
   Access: Private
   Headers: { "Authorization": "Bearer <token>" }
   Body: {
     "name": "Web Development",
     "description": "HTML, CSS, JavaScript",
     "level": "Expert",
     "experience": "5 years",
     "type": "offer"
   }

7. Get My Skills
   GET /skills/my
   Access: Private
   Headers: { "Authorization": "Bearer <token>" }
   Response: {
     "success": true,
     "data": {
       "offer": [ array of offered skills ],
       "want": [ array of wanted skills ]
     }
   }

8. Update Skill
   PUT /skills/:id
   Access: Private
   Headers: { "Authorization": "Bearer <token>" }
   Body: { updated skill fields }

9. Delete Skill
   DELETE /skills/:id
   Access: Private
   Headers: { "Authorization": "Bearer <token>" }

REQUEST ENDPOINTS:

10. Create Swap Request
    POST /requests
    Access: Private
    Headers: { "Authorization": "Bearer <token>" }
    Body: {
      "toUser": "user_id",
      "offeredSkill": "Web Development",
      "requestedSkill": "Guitar",
      "message": "Hi! Let's exchange skills."
    }

11. Get My Requests
    GET /requests/my
    Access: Private
    Headers: { "Authorization": "Bearer <token>" }
    Response: {
      "success": true,
      "data": {
        "received": [ requests received ],
        "sent": [ requests sent ]
      }
    }

12. Update Request Status
    PUT /requests/:id/status
    Access: Private
    Headers: { "Authorization": "Bearer <token>" }
    Body: {
      "status": "accepted" // or "rejected"
    }

MESSAGE ENDPOINTS:

13. Send Message
    POST /messages
    Access: Private
    Headers: { "Authorization": "Bearer <token>" }
    Body: {
      "requestId": "request_id",
      "receiverId": "user_id",
      "message": "Hello!"
    }

14. Get Messages
    GET /messages/:requestId
    Access: Private
    Headers: { "Authorization": "Bearer <token>" }
    Response: {
      "success": true,
      "data": [ array of messages ]
    }

ADMIN ENDPOINTS:

15. Get All Users (Admin Only)
    GET /admin/users
    Access: Private (Admin)
    Headers: { "Authorization": "Bearer <admin_token>" }

16. Delete User (Admin Only)
    DELETE /admin/users/:id
    Access: Private (Admin)
    Headers: { "Authorization": "Bearer <admin_token>" }

17. Get Statistics (Admin Only)
    GET /admin/stats
    Access: Private (Admin)
    Headers: { "Authorization": "Bearer <admin_token>" }
    Response: {
      "success": true,
      "data": {
        "totalUsers": 150,
        "totalSkills": 450,
        "totalRequests": 89,
        "activeRequests": 23
      }
    }

ERROR RESPONSES:

All endpoints return errors in this format:
{
  "success": false,
  "message": "Error description"
}

Common Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error


================================================================================
                        8. FRONTEND PAGES
================================================================================

1. INDEX.HTML (Landing Page)
   Purpose: Welcome page with project overview
   Features:
   - Hero section with call-to-action
   - Feature highlights
   - How it works section
   - Login/Register buttons
   Access: Public

2. REGISTER.HTML
   Purpose: User registration
   Features:
   - Name, email, password, city inputs
   - Client-side validation
   - Google sign-in option (placeholder)
   - Loading states
   Flow: Register → Profile Setup → Dashboard

3. LOGIN.HTML
   Purpose: User authentication
   Features:
   - Email and password inputs
   - Remember me option
   - Forgot password link
   - Loading states
   Flow: Login → Dashboard

4. PROFILE-SETUP.HTML
   Purpose: Initial profile configuration after registration
   Features:
   - Bio input
   - Availability selection
   - Location refinement
   Flow: After Registration → Dashboard

5. DASHBOARD.HTML
   Purpose: Main user dashboard
   Features:
   - Statistics cards (skills, requests, matches)
   - Match suggestions with compatibility scores
   - Recent activity feed
   - Quick actions
   Access: Private (requires login)

6. PROFILE.HTML
   Purpose: User profile view and edit
   Features:
   - Profile information display
   - Skills offered and wanted
   - Edit profile modal
   - Ratings and feedback
   Access: Private

7. SKILLS.HTML
   Purpose: Skill management
   Features:
   - Tabbed interface (Offer / Want)
   - Add skill form
   - Edit/Delete skills
   - Skill cards with details
   Access: Private

8. MAP.HTML
   Purpose: Geographic discovery of users
   Features:
   - Interactive Leaflet.js map
   - User markers with popups
   - Distance filtering
   - Skill filtering
   - Click marker to view profile
   Access: Private

9. REQUESTS.HTML
   Purpose: Manage skill exchange requests
   Features:
   - Received requests tab
   - Sent requests tab
   - Accept/Reject actions
   - Request status badges
   - Request details
   Access: Private

10. MESSAGES.HTML
    Purpose: Communication between matched users
    Features:
    - Conversation list
    - Message thread view
    - Send message input
    - Real-time updates (polling)
    - Timestamps
    Access: Private (only for accepted requests)

11. ADMIN.HTML
    Purpose: Platform administration
    Features:
    - User management table
    - Skill moderation
    - Report handling
    - Platform statistics
    - User actions (suspend/delete)
    Access: Private (Admin only)

12. FORGOT-PASSWORD.HTML
    Purpose: Password recovery
    Features:
    - Email input
    - Reset link sending
    - Success message
    Access: Public

NAVIGATION STRUCTURE:

Public Pages:
- index.html
- login.html
- register.html
- forgot-password.html

Private Pages (require authentication):
- dashboard.html
- profile.html
- profile-setup.html
- skills.html
- map.html
- requests.html
- messages.html

Admin Pages (require admin role):
- admin.html



================================================================================
                        9. KEY FEATURES
================================================================================

FEATURE 1: USER AUTHENTICATION
Technology: JWT (JSON Web Tokens)
Implementation:
- User registers with email/password
- Password hashed with bcrypt (10 salt rounds)
- JWT token generated on login
- Token stored in localStorage
- Token sent in Authorization header for protected routes
- Token verified by middleware on backend

Frontend Code Pattern:
```javascript
// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const data = await response.json();
localStorage.setItem('authToken', data.data.token);
```

Backend Code Pattern:
```javascript
// Middleware
const token = req.headers.authorization.split(' ')[1];
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id);
```

FEATURE 2: SKILL MATCHING ALGORITHM
Purpose: Find compatible users for skill exchange
Factors Considered:
1. Skill Complementarity (50% weight)
   - User A offers what User B wants
   - User B offers what User A wants
2. Geographic Distance (30% weight)
   - Calculated using Haversine formula
   - Closer users score higher
3. Proficiency Level (20% weight)
   - Match skill levels appropriately

Algorithm Pseudocode:
```
For each potential match:
  1. Check if skills complement each other
  2. Calculate distance between users
  3. Compare proficiency levels
  4. Compute weighted score: 
     score = (0.5 * skillMatch) + (0.3 * distanceScore) + (0.2 * proficiencyScore)
  5. Filter matches with score >= threshold (e.g., 40%)
  6. Sort by score descending
  7. Return top N matches
```

FEATURE 3: INTERACTIVE MAP
Technology: Leaflet.js + OpenStreetMap
Implementation:
- Initialize map centered on user location
- Add markers for nearby users
- Color-code markers by skill category
- Show popup on marker click with user info
- Filter markers by distance and skills
- Update markers dynamically

Code Pattern:
```javascript
// Initialize map
const map = L.map('map').setView([lat, lon], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Add marker
L.marker([userLat, userLon])
  .addTo(map)
  .bindPopup('<b>User Name</b><br>Skills: Web Dev');
```

FEATURE 4: REQUEST MANAGEMENT
Workflow:
1. User A views User B's profile
2. User A sends request with offered/requested skills
3. Request status: "pending"
4. User B receives notification
5. User B accepts or rejects
6. If accepted: status = "accepted", messaging enabled
7. If rejected: status = "rejected"

Status Flow:
pending → accepted → (messaging enabled)
pending → rejected → (end)

FEATURE 5: MESSAGING SYSTEM
Implementation:
- Only enabled after request acceptance
- Polling-based updates (checks every 3 seconds)
- Messages stored with requestId reference
- Conversation threading
- Timestamp display

Polling Pattern:
```javascript
setInterval(async () => {
  const response = await fetch(`/api/messages/${requestId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  renderMessages(data.data);
}, 3000);
```

FEATURE 6: ADMIN PANEL
Capabilities:
- View all users
- Suspend/activate accounts
- Delete users
- View platform statistics
- Moderate skills
- Handle reports

Access Control:
- Role-based (user.role === 'admin')
- Middleware checks role before allowing access
- Admin routes protected with authorize middleware


================================================================================
                        10. CODE PATTERNS
================================================================================

PATTERN 1: API CALL WITH AUTHENTICATION

Frontend:
```javascript
async function makeAuthenticatedRequest(endpoint, method = 'GET', body = null) {
  const token = localStorage.getItem('authToken');
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  
  if (body) {
    options.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(`http://localhost:5000/api${endpoint}`, options);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message);
    }
    
    return data.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Usage
const profile = await makeAuthenticatedRequest('/users/profile');
```

PATTERN 2: FORM SUBMISSION WITH LOADING STATE

```javascript
const form = document.getElementById('my-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.loader');
  
  // Show loading
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline-block';
  submitBtn.disabled = true;
  
  try {
    const formData = {
      field1: document.getElementById('field1').value,
      field2: document.getElementById('field2').value
    };
    
    const result = await makeAuthenticatedRequest('/endpoint', 'POST', formData);
    
    // Success
    alert('Success!');
    
  } catch (error) {
    // Error
    alert('Error: ' + error.message);
  } finally {
    // Reset button
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';
    submitBtn.disabled = false;
  }
});
```

PATTERN 3: DYNAMIC CONTENT RENDERING

```javascript
function renderItems(items, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  
  if (items.length === 0) {
    container.innerHTML = '<p class="empty-state">No items found</p>';
    return;
  }
  
  items.forEach(item => {
    const itemHTML = `
      <div class="item-card">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <button onclick="handleAction('${item._id}')">Action</button>
      </div>
    `;
    container.innerHTML += itemHTML;
  });
}
```

PATTERN 4: BACKEND CONTROLLER

```javascript
// Controller function
const getItems = async (req, res) => {
  try {
    // Get user from middleware
    const userId = req.user._id;
    
    // Query database
    const items = await Item.find({ userId }).sort({ createdAt: -1 });
    
    // Send response
    res.json({
      success: true,
      data: items
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

PATTERN 5: MONGOOSE MODEL

```javascript
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', itemSchema);
```

PATTERN 6: PROTECTED ROUTE

```javascript
// Backend route
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getItems, createItem } = require('../controllers/itemController');

// Protected routes
router.get('/', protect, getItems);
router.post('/', protect, createItem);

// Admin only route
router.delete('/:id', protect, authorize('admin'), deleteItem);

module.exports = router;
```


================================================================================
                        11. AUTHENTICATION FLOW
================================================================================

REGISTRATION FLOW:

Step 1: User fills registration form
- Name
- Email
- Password (min 6 characters)
- City

Step 2: Frontend validates input
- Check all fields filled
- Validate email format
- Check password length

Step 3: Frontend sends POST to /api/auth/register
Body: { name, email, password, city }

Step 4: Backend receives request
- Check if email already exists
- If exists: return error
- If not: continue

Step 5: Backend hashes password
- Generate salt (10 rounds)
- Hash password with bcrypt
- Store hashed password

Step 6: Backend creates user document
- Save to MongoDB users collection
- Generate JWT token
- Return user data + token

Step 7: Frontend receives response
- Store token in localStorage
- Store user info in localStorage
- Redirect to profile-setup.html

Step 8: User completes profile setup
- Add bio
- Set availability
- Confirm location

Step 9: Redirect to dashboard.html


LOGIN FLOW:

Step 1: User enters credentials
- Email
- Password

Step 2: Frontend sends POST to /api/auth/login
Body: { email, password }

Step 3: Backend finds user by email
- Query: User.findOne({ email }).select('+password')
- If not found: return 401 error

Step 4: Backend compares passwords
- Use bcrypt.compare(enteredPassword, hashedPassword)
- If no match: return 401 error

Step 5: Backend generates JWT token
- Payload: { id: user._id }
- Sign with JWT_SECRET
- Set expiration (7 days)

Step 6: Backend returns response
- User data (without password)
- JWT token

Step 7: Frontend stores token
- localStorage.setItem('authToken', token)
- localStorage.setItem('userName', user.name)
- localStorage.setItem('userId', user._id)

Step 8: Redirect to dashboard.html


PROTECTED ROUTE ACCESS:

Step 1: User navigates to protected page
- Example: dashboard.html

Step 2: Page loads, checks authentication
```javascript
function checkAuth() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    window.location.href = 'login.html';
  }
}
checkAuth();
```

Step 3: Page makes API request
- Include token in Authorization header
- Header: "Bearer <token>"

Step 4: Backend middleware intercepts request
```javascript
const token = req.headers.authorization.split(' ')[1];
if (!token) {
  return res.status(401).json({ message: 'Not authorized' });
}
```

Step 5: Middleware verifies token
```javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id);
next();
```

Step 6: If valid: proceed to controller
Step 7: If invalid: return 401 error
Step 8: Frontend handles 401
- Clear localStorage
- Redirect to login.html


LOGOUT FLOW:

Step 1: User clicks logout button

Step 2: Frontend clears storage
```javascript
function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userName');
  localStorage.removeItem('userId');
  window.location.href = 'index.html';
}
```

Step 3: Redirect to landing page


TOKEN EXPIRATION:

- Tokens expire after 7 days (configurable)
- When expired, API returns 401
- Frontend detects 401 and redirects to login
- User must login again to get new token


================================================================================
                        12. MATCHING ALGORITHM
================================================================================

ALGORITHM NAME: Skill Compatibility Matcher

PURPOSE:
Find users with complementary skills within geographic proximity

INPUT:
- Current user (with their offered and wanted skills)
- All other users in database
- Maximum distance threshold (default: 50km)

OUTPUT:
- Sorted list of compatible users with match scores

ALGORITHM STEPS:

Step 1: Get current user's skills
```javascript
const currentUserOffers = await Skill.find({ 
  userId: currentUserId, 
  type: 'offer' 
});
const currentUserWants = await Skill.find({ 
  userId: currentUserId, 
  type: 'want' 
});
```

Step 2: Get all other users
```javascript
const otherUsers = await User.find({ 
  _id: { $ne: currentUserId } 
});
```

Step 3: For each other user, calculate match score

Step 3a: Get other user's skills
```javascript
const otherUserOffers = await Skill.find({ 
  userId: otherUserId, 
  type: 'offer' 
});
const otherUserWants = await Skill.find({ 
  userId: otherUserId, 
  type: 'want' 
});
```

Step 3b: Calculate skill complementarity
```javascript
// What current user wants that other user offers
const matchesForCurrent = currentUserWants.filter(want =>
  otherUserOffers.some(offer => offer.name === want.name)
);

// What other user wants that current user offers
const matchesForOther = otherUserWants.filter(want =>
  currentUserOffers.some(offer => offer.name === want.name)
);

// Calculate skill match score
let skillMatchScore = 0;
if (matchesForCurrent.length > 0 && matchesForOther.length > 0) {
  skillMatchScore = 1.0; // Perfect match
} else if (matchesForCurrent.length > 0 || matchesForOther.length > 0) {
  skillMatchScore = 0.5; // Partial match
} else {
  skillMatchScore = 0.0; // No match
}
```

Step 3c: Calculate distance score
```javascript
// Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

const distance = calculateDistance(
  currentUser.latitude,
  currentUser.longitude,
  otherUser.latitude,
  otherUser.longitude
);

// Skip if too far
if (distance > maxDistance) {
  continue;
}

// Calculate distance score (closer = higher score)
const distanceScore = 1 - (distance / maxDistance);
```

Step 3d: Calculate proficiency score
```javascript
// Compare skill levels
// Simplified: assume 0.8 for compatible levels
const proficiencyScore = 0.8;
```

Step 3e: Calculate composite score
```javascript
const compositeScore = 
  (0.5 * skillMatchScore) +
  (0.3 * distanceScore) +
  (0.2 * proficiencyScore);

const matchPercentage = Math.round(compositeScore * 100);
```

Step 4: Filter matches
```javascript
const threshold = 0.4; // 40% minimum match
if (compositeScore >= threshold) {
  matches.push({
    user: otherUser,
    matchScore: matchPercentage,
    distance: distance,
    matchingSkills: matchesForCurrent.concat(matchesForOther)
  });
}
```

Step 5: Sort matches
```javascript
matches.sort((a, b) => b.matchScore - a.matchScore);
```

Step 6: Return top N matches
```javascript
return matches.slice(0, 10); // Top 10 matches
```

EXAMPLE:

User A:
- Offers: Web Development (Expert)
- Wants: Guitar (Beginner)
- Location: San Francisco (37.7749, -122.4194)

User B:
- Offers: Guitar (Advanced)
- Wants: Web Development (Beginner)
- Location: Oakland (37.8044, -122.2712)

Calculation:
- Skill Match: 1.0 (perfect complement)
- Distance: ~13 km
- Distance Score: 1 - (13/50) = 0.74
- Proficiency Score: 0.8
- Composite: (0.5 * 1.0) + (0.3 * 0.74) + (0.2 * 0.8) = 0.882
- Match Percentage: 88%

Result: User B is an 88% match for User A


OPTIMIZATION NOTES:
- Use database indexes on userId and type for faster queries
- Cache user skills to reduce database calls
- Use geospatial queries for distance filtering
- Implement pagination for large user bases
- Consider caching match results with TTL


================================================================================
                        13. COMMON TASKS
================================================================================

TASK 1: ADD A NEW API ENDPOINT

Step 1: Create controller function
File: backend/controllers/yourController.js
```javascript
const yourFunction = async (req, res) => {
  try {
    // Your logic here
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { yourFunction };
```

Step 2: Create route
File: backend/routes/yourRoutes.js
```javascript
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { yourFunction } = require('../controllers/yourController');

router.get('/endpoint', protect, yourFunction);

module.exports = router;
```

Step 3: Register route in server.js
```javascript
app.use('/api/your-resource', require('./routes/yourRoutes'));
```

Step 4: Test with Postman or frontend


TASK 2: ADD A NEW FRONTEND PAGE

Step 1: Create HTML file
File: newpage.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Page - SkillHood</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>New Page</h1>
        <!-- Your content -->
    </div>
    <script src="auth.js"></script>
    <script src="newpage.js"></script>
</body>
</html>
```

Step 2: Create JavaScript file
File: newpage.js
```javascript
// Check authentication
const token = localStorage.getItem('authToken');
if (!token) {
    window.location.href = 'login.html';
}

// Load data
async function loadData() {
    try {
        const response = await fetch('http://localhost:5000/api/endpoint', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        renderData(data.data);
    } catch (error) {
        console.error('Error:', error);
    }
}

loadData();
```

Step 3: Add navigation link
Update navigation in other pages to include link to new page


TASK 3: ADD A NEW DATABASE MODEL

Step 1: Create model file
File: backend/models/YourModel.js
```javascript
const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
  field1: {
    type: String,
    required: true
  },
  field2: {
    type: Number,
    default: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('YourModel', yourSchema);
```

Step 2: Use in controller
```javascript
const YourModel = require('../models/YourModel');

const createItem = async (req, res) => {
  const item = await YourModel.create({
    field1: req.body.field1,
    userId: req.user._id
  });
  res.json({ success: true, data: item });
};
```


TASK 4: MODIFY EXISTING FEATURE

Step 1: Identify files to modify
- Frontend: HTML, CSS, JavaScript files
- Backend: Controller, model, or route files

Step 2: Make changes
- Update code
- Test locally

Step 3: Update documentation
- Update this guide if needed
- Update README if needed


TASK 5: DEBUG AN ISSUE

Step 1: Check browser console
- Open DevTools (F12)
- Look for JavaScript errors
- Check Network tab for failed requests

Step 2: Check backend logs
- Look at terminal running backend
- Check for error messages

Step 3: Verify database
- Use MongoDB Compass
- Check if data exists
- Verify data structure

Step 4: Test API with Postman
- Isolate frontend vs backend issue
- Test API endpoints directly

Step 5: Add console.log statements
- Frontend: console.log(variable)
- Backend: console.log(variable)


TASK 6: DEPLOY TO PRODUCTION

Step 1: Prepare backend
- Set environment variables
- Use production MongoDB URI
- Change JWT_SECRET
- Set NODE_ENV=production

Step 2: Deploy backend
- Options: Heroku, AWS, DigitalOcean, Render
- Push code to hosting platform
- Set environment variables
- Start server

Step 3: Update frontend
- Change API_BASE_URL to production backend URL
- Build/optimize if needed

Step 4: Deploy frontend
- Options: Netlify, Vercel, GitHub Pages
- Upload files or connect Git repo
- Configure build settings

Step 5: Test production
- Test all features
- Check API connections
- Verify authentication works


================================================================================
                        14. TROUBLESHOOTING
================================================================================

ISSUE 1: "Cannot connect to MongoDB"

Symptoms:
- Backend crashes on startup
- Error: "MongooseServerSelectionError"

Solutions:
1. Check if MongoDB is running
   - Windows: Check Services
   - Mac/Linux: Run `mongod` in terminal

2. Verify MONGODB_URI in .env
   - Should be: mongodb://localhost:27017/skillhood
   - Or MongoDB Atlas connection string

3. Check MongoDB port
   - Default: 27017
   - Ensure no other service using this port

4. Check firewall settings
   - Allow MongoDB connections


ISSUE 2: "401 Unauthorized" on API calls

Symptoms:
- API returns 401 status
- User redirected to login

Solutions:
1. Check if token exists
   - console.log(localStorage.getItem('authToken'))

2. Verify token format in header
   - Should be: "Bearer <token>"
   - Check Authorization header

3. Check token expiration
   - Tokens expire after 7 days
   - Login again to get new token

4. Verify JWT_SECRET matches
   - Backend and token must use same secret


ISSUE 3: "CORS Error"

Symptoms:
- Browser console shows CORS error
- API calls blocked

Solutions:
1. Enable CORS in backend
   ```javascript
   const cors = require('cors');
   app.use(cors());
   ```

2. Specify origin if needed
   ```javascript
   app.use(cors({
     origin: 'http://localhost:3000'
   }));
   ```

3. Check request headers
   - Ensure Content-Type is set


ISSUE 4: Map not displaying

Symptoms:
- Blank map area
- No tiles loading

Solutions:
1. Check internet connection
   - OpenStreetMap tiles load from internet

2. Verify Leaflet.js loaded
   - Check browser console for errors

3. Check map initialization
   - Ensure lat/lon are valid numbers
   - Verify map container has height in CSS

4. Check API key (if using paid tiles)


ISSUE 5: Skills not saving

Symptoms:
- Skill form submits but skill doesn't appear

Solutions:
1. Check API response
   - Open Network tab
   - Look at response from POST /api/skills

2. Verify token is valid
   - Check Authorization header

3. Check required fields
   - name, type are required

4. Verify userId is set
   - Backend should get userId from token


ISSUE 6: Messages not updating

Symptoms:
- New messages don't appear
- Have to refresh page

Solutions:
1. Check polling interval
   - Should run every 3 seconds
   - Verify setInterval is working

2. Check API endpoint
   - GET /api/messages/:requestId
   - Verify requestId is correct

3. Check if request is accepted
   - Messages only work for accepted requests

4. Clear browser cache


ISSUE 7: "User already exists" on registration

Symptoms:
- Cannot register with email
- Error message shown

Solutions:
1. Email already in database
   - Use different email
   - Or login with existing account

2. Check database
   - Use MongoDB Compass
   - Search for email in users collection

3. Delete test user if needed
   - Only in development!


ISSUE 8: Styles not loading

Symptoms:
- Page looks unstyled
- No glassmorphism effects

Solutions:
1. Check styles.css path
   - Should be: <link rel="stylesheet" href="styles.css">
   - Verify file exists

2. Check browser cache
   - Hard refresh: Ctrl+Shift+R

3. Check CSS syntax errors
   - Look for unclosed brackets
   - Validate CSS

4. Check file serving
   - Ensure server serves static files


================================================================================
                        15. DEPLOYMENT GUIDE
================================================================================

DEPLOYMENT OPTION 1: HEROKU (Backend)

Step 1: Install Heroku CLI
- Download from heroku.com

Step 2: Login to Heroku
```bash
heroku login
```

Step 3: Create Heroku app
```bash
cd backend
heroku create skillhood-api
```

Step 4: Set environment variables
```bash
heroku config:set MONGODB_URI="your_mongodb_atlas_uri"
heroku config:set JWT_SECRET="your_secret_key"
heroku config:set NODE_ENV="production"
```

Step 5: Deploy
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku master
```

Step 6: Open app
```bash
heroku open
```

Backend URL: https://skillhood-api.herokuapp.com


DEPLOYMENT OPTION 2: NETLIFY (Frontend)

Step 1: Create Netlify account
- Go to netlify.com

Step 2: Update API URL in frontend
- Change all fetch URLs to production backend
- Example: 'https://skillhood-api.herokuapp.com/api'

Step 3: Deploy via drag-and-drop
- Drag frontend folder to Netlify
- Or connect Git repository

Step 4: Configure
- Set build command (if needed)
- Set publish directory

Frontend URL: https://skillhood.netlify.app


DEPLOYMENT OPTION 3: MONGODB ATLAS (Database)

Step 1: Create MongoDB Atlas account
- Go to mongodb.com/cloud/atlas

Step 2: Create cluster
- Choose free tier
- Select region

Step 3: Create database user
- Set username and password

Step 4: Whitelist IP
- Add 0.0.0.0/0 for all IPs (development)
- Or specific IPs (production)

Step 5: Get connection string
- Click "Connect"
- Choose "Connect your application"
- Copy connection string

Step 6: Update .env
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skillhood
```


DEPLOYMENT OPTION 4: VERCEL (Full Stack)

Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

Step 2: Deploy frontend
```bash
cd skillhood
vercel
```

Step 3: Deploy backend
```bash
cd backend
vercel
```

Step 4: Set environment variables
- In Vercel dashboard
- Add MONGODB_URI, JWT_SECRET


PRODUCTION CHECKLIST:

Backend:
- [ ] Change JWT_SECRET to strong random string
- [ ] Use MongoDB Atlas (not local MongoDB)
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Add request logging
- [ ] Set up error tracking (Sentry)
- [ ] Configure CORS for specific origin
- [ ] Add API documentation
- [ ] Set up CI/CD pipeline

Frontend:
- [ ] Update API URLs to production
- [ ] Minify CSS/JS
- [ ] Optimize images
- [ ] Add meta tags for SEO
- [ ] Configure custom domain
- [ ] Enable HTTPS
- [ ] Add analytics (Google Analytics)
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Add error boundaries

Database:
- [ ] Use MongoDB Atlas
- [ ] Enable authentication
- [ ] Set up backups
- [ ] Configure indexes
- [ ] Monitor performance
- [ ] Set up alerts

Security:
- [ ] Use environment variables
- [ ] Never commit .env file
- [ ] Use strong JWT secret
- [ ] Enable HTTPS everywhere
- [ ] Validate all inputs
- [ ] Sanitize user data
- [ ] Add rate limiting
- [ ] Monitor for attacks


================================================================================
                            END OF GUIDE
================================================================================

This guide contains everything an AI assistant needs to understand and work 
on the SkillHood project. Use this as a reference for:

- Understanding project structure
- Making code changes
- Adding new features
- Debugging issues
- Deploying to production

For questions or issues, refer to specific sections above.

Project Location: C:\skillhood
Last Updated: 2024
Version: 1.0.0

================================================================================
