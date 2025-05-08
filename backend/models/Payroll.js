// backend/models/payroll.js
import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema({
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  confirmedHours: { type: Number, default: 0 },
  unconfirmedHours: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
  confirmedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  confirmedAt: { type: Date }
}, {
  timestamps: true
});

// ✅ Prevent OverwriteModelError
export default mongoose.models.Payroll || mongoose.model('Payroll', payrollSchema);
