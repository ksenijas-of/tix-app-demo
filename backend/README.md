# Tix App Backend

Node.js backend server for the Tix App.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on http://localhost:3000

## Endpoints

- `POST /api/chat` - Chat endpoint that receives `{ prompt: string }` and returns `{ message: string }`
- `GET /health` - Health check endpoint
