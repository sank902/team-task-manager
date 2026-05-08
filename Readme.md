# 🚀 TeamFlow — Collaborative Team Task Management Platform

TeamFlow is a modern full-stack collaborative task management application built for teams to organize projects, assign tasks, monitor progress, and streamline workflow management.

The platform provides secure authentication, role-based permissions, project collaboration, Kanban-style task tracking, and analytics — all within a responsive modern UI.

---

# 🌍 Live Demo

### Frontend
https://your-frontend-url.vercel.app

### Backend API
https://your-backend-url.up.railway.app

---

# 📸 Screenshots

## 🏠 Landing Page
(Add Screenshot Here)

## 🔐 Authentication
(Add Screenshot Here)

## 📊 Dashboard
(Add Screenshot Here)

## 📋 Project Workspace
(Add Screenshot Here)

## ✅ Task Board
(Add Screenshot Here)

---

# ✨ Core Features

## 🔐 Authentication & Authorization

- JWT-based secure authentication
- Password hashing with bcrypt
- Protected API routes
- Persistent user sessions
- Secure role-based access control

---

## 👥 Role-Based Access Control (RBAC)

### 👑 Admin
- Create projects
- Invite/add members
- Create tasks
- Assign tasks
- Manage workflow

### 👤 Member
- View assigned projects
- Update task status
- Track task progress

---

## 📁 Project Management

- Create and manage multiple projects
- Organize team workflows
- Project-specific task boards
- Team collaboration system

---

## ✅ Task Management

### Task Status Flow
- Todo
- In Progress
- Done

### Task Priorities
- High
- Medium
- Low

### Features
- Assign tasks to users
- Update task status
- Real-time workflow tracking
- Kanban-style organization

---

## 📊 Dashboard Analytics

- Total tasks overview
- Completed tasks tracking
- Progress monitoring
- Team workload visibility
- Project-based organization

---

# 🛠 Tech Stack

## Frontend
| Technology | Purpose |
|---|---|
| React.js | UI Development |
| Vite | Frontend Build Tool |
| Axios | API Communication |
| React Router DOM | Routing |
| CSS3 | Styling |

---

## Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express.js | REST API |
| JWT | Authentication |
| bcrypt.js | Password Hashing |

---

## Database
| Technology | Purpose |
|---|---|
| MongoDB | Database |
| Mongoose | ODM |

---

## Deployment
| Platform | Usage |
|---|---|
| Railway | Backend Deployment |
| Vercel | Frontend Deployment |

---

# 🏗 System Architecture

```text
Frontend (React + Vite)
        ↓
Axios API Requests
        ↓
Backend (Express.js)
        ↓
JWT Authentication Middleware
        ↓
MongoDB Database
```

---

# 📂 Folder Structure

```bash
team-task-manager/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Local Development Setup

# 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/teamflow.git
cd teamflow
```

---

# 🔧 Backend Setup

## Navigate to backend folder

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Run backend server

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 💻 Frontend Setup

## Navigate to frontend folder

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 🔗 API Endpoints

# Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register User |
| POST | `/api/auth/login` | Login User |

---

# Projects

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/projects` | Fetch Projects |
| POST | `/api/projects` | Create Project |

---

# Tasks

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks?projectId=id` | Fetch Tasks |
| POST | `/api/tasks` | Create Task |
| PUT | `/api/tasks/:id` | Update Task Status |

---

# 🔐 Authentication Flow

1. User logs in
2. Backend generates JWT token
3. Token stored in localStorage
4. Axios sends token automatically
5. Backend validates protected routes

Example:

```js
Authorization: Bearer <token>
```

---

# 🚀 Deployment Guide

## Backend Deployment (Railway)

- Create Railway Project
- Add MongoDB Environment Variables
- Deploy backend repository

---

## Frontend Deployment (Vercel)

- Import frontend project
- Add backend API URL
- Deploy production build

---

# 🧪 Future Improvements

- Real-time collaboration using Socket.io
- Drag & Drop Kanban Board
- Notifications System
- File Attachments
- Due Dates & Calendar Integration
- Activity Logs
- Team Chat
- Dark Mode
- Email Notifications

---

# 📚 What I Learned

During this project, I improved my understanding of:

- REST API Architecture
- JWT Authentication
- Role-Based Access Control
- MongoDB Data Modeling
- React State Management
- Frontend-Backend Integration
- Full Stack Deployment
- Protected Routes & Middleware

---

# 👨‍💻 Author

## Sankalp Khare

B.Tech Computer Science Engineering Student  
MERN Stack Developer

### Connect With Me

- GitHub: https://github.com/yourusername
- LinkedIn: https://linkedin.com/in/yourprofile

---

# 📄 License

This project is developed for educational and learning purposes.