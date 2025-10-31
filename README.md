To-Do List App (Android) - React Native + Node.js/Express + MongoDB

Tech stack
- Frontend: React Native CLI (TypeScript), React Navigation, React Native Paper, Axios, AsyncStorage
- Backend: Node.js, Express, TypeScript, Mongoose, JWT, bcrypt, express-validator, dotenv, cors, morgan
- Optional: Docker Compose for backend + MongoDB

Monorepo structure
- backend/ — Express API (TypeScript)
- frontend/ — React Native app (TypeScript)

Backend setup
1) Configure environment
   - Copy `backend/ENV_EXAMPLE.txt` to `backend/.env` and set values:
     - PORT=4000
     - MONGO_URI=mongodb://localhost:27017/todoapp
     - JWT_SECRET=your-long-random-string
2) Install deps
   - `cd backend`
   - `npm install`
3) Run (dev)
   - `npm run dev`
   - Health check: GET http://localhost:4000/api/health
4) Seed data (optional)
   - `npm run seed` (creates demo user + tasks)

Docker (backend + Mongo)
- From repo root: `docker compose up --build`
- API will listen on `http://localhost:4000`

Frontend setup (React Native CLI)
Prereqs: Android Studio + SDKs, Java 17, platform tools; follow RN CLI docs.

1) Initialize native project (if you don’t already have android/ generated)
   - You can use the provided `frontend/` source as-is, but RN CLI usually generates native folders.
   - If needed, run: `npx react-native init TodoApp --template react-native-template-typescript`
   - Then replace the generated `App.tsx` and `src/` with contents from `frontend/`.
   - Or keep `frontend/` as your RN app folder and run CLI commands from there once you have native folders.

2) Configure API base URL
   - Copy `frontend/ENV_EXAMPLE.txt` to `frontend/.env` and set:
     - For Android emulator: `API_BASE_URL=http://10.0.2.2:4000`
     - For physical device (same network): `API_BASE_URL=http://<your-computer-ip>:4000`

3) Install deps
   - `cd frontend`
   - `npm install`
   - Android: `npx pod-install` is for iOS; not needed here.

4) Start Metro bundler
   - `npm start`

5) Run Android
   - Emulator: ensure an Android emulator is running (AVD)
   - In another terminal: `npm run android`

Security note (JWT storage)
- JWT is stored in `AsyncStorage` for simplicity. For higher security, consider platform-specific secure storage (e.g., Keystore) or refresh-token flows.

API summary
- POST /api/auth/register — { email, password }
- POST /api/auth/login — { email, password }
- GET /api/tasks — Bearer token required
- POST /api/tasks — { title, description?, datetime?, deadline?, priority? }
- PATCH /api/tasks/:id — update fields or { completed }
- DELETE /api/tasks/:id

Postman collection
- Import `backend/postman_collection.json`
- Set `baseUrl` variable to `http://localhost:4000` (or device IP)
- Save `token` from Login response to the collection variable to test task routes

Demo flow
1) Register with email/password
2) Login and receive token
3) In the app: add a task with title/priority/deadline
4) Mark task completed
5) Delete task

Key frontend locations
- `frontend/src/context/AuthContext.tsx` — auth state + JWT handling
- `frontend/src/context/TaskContext.tsx` — task state, sorting/filtering
- `frontend/src/api/*` — axios client and API wrappers
- `frontend/src/screens/*` — Login, Register, TaskList, TaskDetail, AddTask, Profile
- `frontend/src/components/*` — Button, Input, TaskCard

Key backend locations
- `backend/src/models/*` — Mongoose models (User, Task)
- `backend/src/controllers/*` — auth/task handlers
- `backend/src/routes/*` — auth/task routes
- `backend/src/middleware/auth.ts` — JWT guard
- `backend/src/utils/seed.ts` — seed data

Libraries (explicit)
- Frontend: `axios`, `react-native-paper`, `@react-navigation/native`, `@react-navigation/native-stack`, `@react-native-async-storage/async-storage`
- Backend: `mongoose`, `bcrypt`, `jsonwebtoken`, `express-validator`, `express`, `dotenv`, `cors`, `morgan`


