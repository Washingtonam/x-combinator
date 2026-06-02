const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  amountKobo: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'success', 'failed', 'rejected'], default: 'pending' },
  reference: { type: String, required: true, unique: true },
  meta: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
