const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { verifyPaystackSignature } = require('../utils/paystack');

const router = express.Router();

// Paystack webhook endpoint
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['x-paystack-signature'];
  const secret = process.env.PAYSTACK_SECRET;
  let body;
  try {
    body = JSON.parse(req.body.toString());
  } catch (err) {
    return res.status(400).send('invalid body');
  }

  if (!verifyPaystackSignature(body, signature, secret)) {
    return res.status(401).send('invalid signature');
  }

  const event = body.event || '';
  const data = body.data || {};
  const reference = data.reference;
  const amountKobo = Number(data.amount || 0);
  const customerEmail = data.customer ? data.customer.email : null;

  // Only handle charge.success
  if (event !== 'charge.success') return res.status(200).send('ignored');

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    let tx = await Transaction.findOne({ reference }).session(session);
    if (tx && tx.status === 'success') {
      await session.commitTransaction();
      session.endSession();
      return res.status(200).send('already processed');
    }

    // If transaction doesn't exist, create a minimal record
    if (!tx) {
      // Attempt to associate user by email
      const user = customerEmail ? await User.findOne({ email: customerEmail }).session(session) : null;
      tx = await Transaction.create([
        {
          userId: user ? user._id : undefined,
          type: 'WALLET_FUND',
          amountKobo,
          status: 'success',
          reference,
          meta: data
        }
      ], { session });
      tx = tx[0];
    } else {
      tx.status = 'success';
      tx.amountKobo = amountKobo;
      tx.meta = data;
      await tx.save({ session });
    }

    if (tx.userId) {
      await User.updateOne({ _id: tx.userId }, { $inc: { walletBalanceKobo: amountKobo } }).session(session);
    }

    await session.commitTransaction();
    session.endSession();
    return res.status(200).send('ok');
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    return res.status(500).send('error');
  }
});

module.exports = router;
