# Project Management Application

A full-stack project management application built with React and Express.js.

## Features

- Project creation and management
- Task tracking
- User authentication
- Team collaboration
- Real-time updates

## Tech Stack

### Frontend
- React 19
- Vite
- Modern CSS

### Backend
- Node.js
- Express.js
- RESTful API

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/cuzitsvicky/Project-Management.git
cd Project-Management
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm start
```
The backend will run on http://localhost:3000

2. Start the frontend development server
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:5173

## Project Structure

```
Project-Management/
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── validators/      # Input validation
│   └── server.js        # Entry point
│
└── frontend/
    └── src/
        ├── components/  # Reusable components
        ├── pages/       # Page components
        ├── services/    # API services
        ├── context/     # React context
        ├── hooks/       # Custom hooks
        ├── utils/       # Utility functions
        └── styles/      # CSS files
```

## License

ISC

