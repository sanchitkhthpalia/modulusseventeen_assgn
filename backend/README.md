Backend - Node.js + Express + TypeScript + MongoDB

Libraries used: express, mongoose, jsonwebtoken, bcrypt, express-validator, dotenv, cors, morgan

Setup
- Node.js 18+ and npm
- MongoDB (local or via Docker)

Environment variables
- Copy `ENV_EXAMPLE.txt` to `.env` and set values:
  - PORT=4000
  - MONGO_URI=mongodb://localhost:27017/todoapp
  - JWT_SECRET=your-long-random-string

Install
```
npm install
```

Run in dev
```
npm run dev
```

Build and start
```
npm run build
npm start
```

Seed demo data
```
npm run seed
```

Docker (backend + Mongo)
At the repo root, run:
```
docker compose up --build
```

Endpoints
- POST /api/auth/register { email, password }
- POST /api/auth/login { email, password }
- GET /api/tasks (Bearer token)
- POST /api/tasks (Bearer token) { title, description?, datetime?, deadline?, priority? }
- PATCH /api/tasks/:id (Bearer token)
- DELETE /api/tasks/:id (Bearer token)

Demo flow
1) Register, 2) Login to get token, 3) Create task, 4) Mark complete via PATCH, 5) Delete task.


