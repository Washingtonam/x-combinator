const mongoose = require('mongoose');

const PricingSchema = new mongoose.Schema({
  serviceType: { type: String, required: true, unique: true },
  costKobo: { type: Number, required: true },
  unitsRequired: { type: Number, default: 1 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pricing', PricingSchema);
