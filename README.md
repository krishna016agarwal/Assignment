# NayePankh Foundation MERN Website

Animated responsive MERN project with volunteer registration, MongoDB connection, JWT authentication, admin dashboard, reports, charts, fake data seeding and professional UI.

## Tech Stack

- Frontend: React + Vite, Framer Motion, GSAP, Recharts, Lucide Icons
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Zod validation

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Paste your MongoDB Atlas URI in `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=change_this_to_a_long_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Seed fake data:

```bash
npm run seed
```

Run backend:

```bash
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on `http://localhost:5173`.
Backend runs on `http://localhost:5000`.

## Demo Credentials

Admin:

```txt
admin@nayepankh.org
admin123
```

Volunteer:

```txt
volunteer1@demo.com
password123
```

## Main Features

- User register/login
- JWT protected API
- Admin-only dashboard
- Volunteer registration form
- Volunteer status update: Pending / Approved / Rejected
- Search and filter volunteers
- Dashboard analytics cards
- Recharts charts
- JSON report export
- Fake volunteer data seed
- Responsive animated frontend
