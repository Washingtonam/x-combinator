require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const paymentsRoutes = require('./routes/payments');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentsRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;

async function start() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error('MONGODB_URI not set');
  await mongoose.connect(mongoUri, { autoIndex: true });
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
