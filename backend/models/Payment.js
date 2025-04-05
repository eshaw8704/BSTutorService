import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subject: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentStatus: { type: String, default: 'paid' },
  transactionId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const Payment = mongoose.model('Payment', paymentSchema);
