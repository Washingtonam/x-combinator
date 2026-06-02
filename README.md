# X-Combinator — Identity & Corporate Services Portal (Scaffold)

This repository contains an initial industry-grade scaffold for a Nigerian identity and corporate services portal.

Backend: Node.js + Express + Mongoose
Frontend: React + Vite

Quick start (backend):

```
cd backend
npm install
# create a .env with MONGODB_URI, JWT_SECRET, PAYSTACK_SECRET
npm run dev
```

Quick start (frontend):

```
cd frontend
npm install
npm run dev
```

Files added include models, auth middleware, and a Paystack webhook processor that updates `walletBalanceKobo` atomically.

## GitHub and Railway deployment

1. Commit the full repository:

```bash
cd c:/Users/washi/x-combinator
git add .
git commit -m "chore: add scaffolded backend and frontend"
git push origin main
```

2. Connect on Railway:

- Create a new Railway project and connect your GitHub repo `Washingtonam/x-combinator`.
- Set environment variables in Railway for the backend: `MONGODB_URI`, `JWT_SECRET`, `PAYSTACK_SECRET`.
- Use the default deploy command from `railway.json`.

3. Use Atlas for production DB and keep `backend/.env` local only.
