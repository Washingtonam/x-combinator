const mongoose = require('mongoose');

const StatusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  note: String,
  at: { type: Date, default: Date.now }
});

const ServiceRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceType: { type: String, required: true },
  inputData: { type: mongoose.Schema.Types.Mixed },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'rejected'], default: 'pending' },
  statusHistory: { type: [StatusHistorySchema], default: [] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);
