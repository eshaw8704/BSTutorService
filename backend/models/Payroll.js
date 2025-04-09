import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema({
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  confirmedHours: {
    type: Number,
    required: true
  },
  nonConfirmedHours: {
    type: Number,
    required: true
  },
  confirmedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Admin who reviewed
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Payroll = mongoose.model('Payroll', payrollSchema);
