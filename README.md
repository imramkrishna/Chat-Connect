# 💬 Chat-Connect

<div align="center">

![Chat-Connect Banner](https://img.shields.io/badge/Chat-Connect-blue?style=for-the-badge&logo=chat&logoColor=white)

A real-time chat application with WebSocket support, file sharing, and modern UI built with React and TypeScript.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=flat&logo=socket.io&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
[![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [API](#-api) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [WebSocket Events](#-websocket-events)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

### 🎯 Core Features

- **Real-time Messaging** - Instant message delivery using WebSocket
- **Room-based Chat** - Create and join chat rooms with unique IDs
- **File Sharing** - Upload and share files (images, videos, documents, PDFs)
- **User Management** - Admin controls to manage room members
- **System Notifications** - Real-time notifications for user joins/leaves
- **Responsive Design** - Beautiful UI that works on desktop and mobile

### 🎨 UI/UX Features

- **Modern Gradient Design** - Sleek dark theme with vibrant gradients
- **Avatar System** - Auto-generated avatars with color coding
- **File Preview** - Visual preview for images and styled cards for documents
- **Typing Indicators** - See message timestamps
- **Member Sidebar** - View all active members in the room
- **Mobile-friendly** - Collapsible sidebar and responsive layout

### 🔐 Room Features

- **Create Rooms** - Generate unique room IDs instantly
- **Join Rooms** - Join existing rooms with room ID
- **Invite System** - Copy room ID to invite friends
- **Admin Controls** - Room creators can remove members
- **User Roles** - Admin and member role distinction

### 📁 File Sharing

- **Multiple File Types** - Support for images, videos, PDFs, documents
- **File Metadata** - Display file name, size, and type
- **Download Support** - Click to download any shared file
- **Visual Icons** - Different icons for different file types
- **File Size Limit** - Configurable upload size limits

---

## 🎬 Demo

### Screenshots

#### Landing Page
![Landing Page](docs/landing-page.png)

#### Chat Room
![Chat Room](docs/chat-room.png)

#### File Sharing
![File Sharing](docs/file-sharing.png)

---

## 🛠 Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.1 | UI Framework |
| **TypeScript** | 5.9.3 | Type Safety |
| **Vite** | 7.1.7 | Build Tool |
| **React Router** | 7.9.4 | Routing |
| **Tailwind CSS** | 4.1.14 | Styling |
| **React Icons** | 5.5.0 | Icon Library |
| **WebSocket API** | Native | Real-time Communication |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 22.x | Runtime |
| **Express** | 5.1.0 | Web Framework |
| **TypeScript** | Latest | Type Safety |
| **ws** | 8.18.3 | WebSocket Server |
| **Multer** | 2.0.2 | File Upload |
| **CORS** | 2.8.5 | Cross-Origin Support |

---

## 📁 Project Structure

```
Chat-Connect/
├── frontend/                  # React Frontend Application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── assets/          # Images, icons
│   │   ├── components/      # Reusable components
│   │   │   ├── AttachmentMenu.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── useSocket.ts
│   │   ├── messages/        # Message constants
│   │   │   └── message.ts
│   │   ├── modals/          # Modal components
│   │   │   ├── ChatRoomModal.tsx
│   │   │   ├── CreateRoomModal.tsx
│   │   │   └── JoinRoomModal.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── ChatRoom.tsx
│   │   │   └── LandingPage.tsx
│   │   ├── App.tsx          # Main App component
│   │   ├── main.tsx         # Entry point
│   │   └── types.tsx        # TypeScript types
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # Express Backend Application
│   ├── src/
│   │   ├── ChatManager/     # Chat management logic
│   │   │   ├── Chat.ts
│   │   │   └── ChatManager.ts
│   │   ├── storage/         # File storage configuration
│   │   │   ├── fileFilter.ts
│   │   │   ├── storage.ts
│   │   │   └── upload.ts
│   │   ├── utils/           # Utility functions
│   │   │   ├── generateRoomId.ts
│   │   │   ├── message.ts
│   │   │   └── types.ts
│   │   └── index.ts         # Entry point
│   ├── uploads/             # Uploaded files storage
│   ├── package.json
│   └── tsconfig.json
│
└── README.md                # This file
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Clone Repository

```bash
git clone https://github.com/imramkrishna/Chat-Connect.git
cd Chat-Connect
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Build TypeScript
npm run build

# Start the server
npm run dev
```

The backend server will start on **http://localhost:8000**

### Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on **http://localhost:5173**

---

## 💻 Usage

### Creating a Chat Room

1. Open the application in your browser
2. Click **"Create Room"**
3. Enter your name and room name
4. Click **"Create"**
5. Share the generated **Room ID** with friends

### Joining a Chat Room

1. Click **"Join Room"**
2. Enter your name and the **Room ID**
3. Click **"Join"**
4. Start chatting!

### Sending Messages

- Type your message in the input field
- Press **Enter** to send (or click the Send button)
- Use **Shift + Enter** for new lines

### Sharing Files

1. Click the **📎 attachment icon**
2. Select file type (Files or Photos & Videos)
3. Choose your file
4. Add optional message
5. Click **Send**
6. Recipients can click the file to download

### Admin Controls

As a room creator (admin), you can:
- **Remove members** by hovering over their name and clicking ✖
- View the **room info** and copy Room ID
- Manage room settings

---

## 🔧 Environment Variables

### Backend

Create a `.env` file in the `backend` directory (optional):

```env
PORT=8000
NODE_ENV=development
MAX_FILE_SIZE=10485760  # 10MB in bytes
UPLOAD_DIR=uploads
```

### Frontend

Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

---

## 📡 API Documentation

### REST Endpoints

#### 1. Health Check

```http
GET /
```

**Response:**
```json
"Server is running for chat connect."
```

#### 2. Upload File

```http
POST /upload
```

**Headers:**
```
Content-Type: multipart/form-data
```

**Body:**
```
uploaded_file: <file>
```

**Response:**
```json
{
  "message": "File uploaded successfully",
  "file": {
    "filename": "1697500800000-document.pdf",
    "originalname": "document.pdf",
    "mimetype": "application/pdf",
    "size": 1024000,
    "path": "uploads/1697500800000-document.pdf",
    "url": "http://localhost:8000/uploads/1697500800000-document.pdf"
  }
}
```

#### 3. Serve Files

```http
GET /uploads/:filename
```

**Response:**
- File content with appropriate headers

---

## 🌐 WebSocket Events

### Client → Server

#### 1. Create Room

```typescript
{
  type: "CREATE_ROOM",
  payload: {
    name: "John Doe",
    chatName: "My Chat Room"
  }
}
```

#### 2. Join Room

```typescript
{
  type: "JOIN_ROOM",
  payload: {
    name: "Jane Doe",
    chatId: "ABC123"
  }
}
```

#### 3. Send Message

```typescript
{
  type: "MESSAGE",
  chatId: "ABC123",
  message: "Hello, everyone!",
  file?: {
    fileName: "document.pdf",
    originalName: "My Document.pdf",
    mimeType: "application/pdf",
    size: 1024000
  }
}
```

#### 4. Leave Room

```typescript
{
  type: "LEAVE_ROOM",
  chatId: "ABC123"
}
```

#### 5. Remove User (Admin only)

```typescript
{
  type: "KICK_OUT",
  chatId: "ABC123",
  removeUserId: 123
}
```

### Server → Client

#### 1. Room Created

```typescript
{
  type: "ROOM_CREATED",
  chatId: "ABC123",
  chatName: "My Chat Room",
  chatUsers: [...],
  userId: 1,
  isAdmin: true
}
```

#### 2. Room Joined

```typescript
{
  type: "ROOM_JOINED",
  chatId: "ABC123",
  chatName: "My Chat Room",
  chatUsers: [...],
  chatMessages: [...],
  userId: 2,
  isAdmin: false
}
```

#### 3. New Message

```typescript
{
  type: "MESSAGE",
  userId: 1,
  senderName: "John Doe",
  message: "Hello!",
  chatId: "ABC123",
  sentTime: "2025-10-17T12:00:00Z",
  file?: {
    fileName: "doc.pdf",
    originalName: "Document.pdf",
    mimeType: "application/pdf",
    size: 1024000
  }
}
```

#### 4. User Joined

```typescript
{
  type: "NEW_USER_JOINED",
  chatUsers: [...]
}
```

#### 5. User Left

```typescript
{
  type: "USER_LEFT",
  userName: "John Doe",
  chatUsers: [...]
}
```

#### 6. User Removed

```typescript
{
  type: "USER_REMOVED",
  name: "John Doe",
  users: [...]
}
```

---

## 🏗 Development

### Frontend Development

```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Development

```bash
cd backend
npm run dev      # Build and start server
tsc -b           # Build TypeScript only
node dist/index.js  # Run compiled code
```

### Code Structure

#### Frontend Component Example

```typescript
// src/components/MyComponent.tsx
import { useState } from 'react';

interface Props {
  title: string;
}

const MyComponent = ({ title }: Props) => {
  const [state, setState] = useState('');
  
  return (
    <div>{title}</div>
  );
};

export default MyComponent;
```

#### Backend Route Example

```typescript
// src/routes/myRoute.ts
import { Router } from 'express';

const router = Router();

router.get('/endpoint', (req, res) => {
  res.json({ message: 'Success' });
});

export default router;
```

---

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

---

## 🚢 Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
vercel deploy
```

### Backend (Heroku/Railway)

```bash
cd backend
git push heroku main
```

### Environment Variables (Production)

Update URLs to production domains:
- Frontend: `VITE_BACKEND_URL=https://api.chatconnect.com`
- Backend: Configure CORS for production frontend URL

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Coding Standards

- Use **TypeScript** for type safety
- Follow **ESLint** rules
- Write **meaningful commit messages**
- Add **comments** for complex logic
- Test your changes before submitting

---

## 🐛 Known Issues

- [ ] File upload size limit needs frontend validation
- [ ] Mobile keyboard might overlap input field
- [ ] Large file uploads may take time without progress indicator

---

## 🗺 Roadmap

- [ ] Add user authentication
- [ ] Implement message encryption
- [ ] Add emoji picker
- [ ] Voice/Video call support
- [ ] Message search functionality
- [ ] Dark/Light theme toggle
- [ ] Message reactions
- [ ] Cloud storage integration (Cloudinary)
- [ ] Read receipts
- [ ] Typing indicators

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Ram Krishna Yadav**

- GitHub: [@imramkrishna](https://github.com/imramkrishna)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) - Real-time Communication
- [Vite](https://vitejs.dev/) - Build Tool
- [Express](https://expressjs.com/) - Backend Framework

---

## 📞 Support

If you have any questions or need help, feel free to:

- Open an [Issue](https://github.com/imramkrishna/Chat-Connect/issues)
- Start a [Discussion](https://github.com/imramkrishna/Chat-Connect/discussions)
- Contact via email

---

<div align="center">

**Made with ❤️ by Ram Krishna Yadav**

⭐ **Star this repo if you find it helpful!** ⭐

</div>
