# 🚀 TeamFlow — Collaborative Team Task Management Platform

TeamFlow is a modern full-stack collaborative task management application built for teams to organize projects, assign tasks, monitor progress, and streamline workflow management.

The platform provides secure authentication, role-based permissions, project collaboration, Kanban-style task tracking, and analytics — all within a responsive modern UI.

---

# 🌍 Live Demo
https://taskyyy.up.railway.app/

---

# 📸 Screenshots

## 🏠 Landing Page
<img width="946" height="470" alt="{C06CC93F-7616-46EF-AA36-FB4AB68CF36D}" src="https://github.com/user-attachments/assets/42ff88d7-e9f0-418d-b4d6-778548f819ed" />


## 🔐 Authentication
<img width="938" height="462" alt="{3D1D23B6-090A-4962-81A3-04DE780CE559}" src="https://github.com/user-attachments/assets/539745d6-7cc4-48e0-a6a6-39c0c0cd582d" />


## 📊 Dashboard
<img width="943" height="463" alt="{CA10CC15-DAD5-49E2-A92D-DE6DDC61B153}" src="https://github.com/user-attachments/assets/e29b2460-7da8-4dc8-ac43-b77e5dc2faf5" />


## 📋 Project Workspace
<img width="947" height="468" alt="{8342F746-87AF-46D6-9BD8-A816E7D381B2}" src="https://github.com/user-attachments/assets/81b8d8e6-c559-407d-9e84-f01af5b22262" />


## ✅ Task Board
<img width="948" height="467" alt="{430CAD6C-1A88-4F08-9728-19A9A3E6992D}" src="https://github.com/user-attachments/assets/1d22b703-0178-4d70-99f6-d774d5cf2e7a" />


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
