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
