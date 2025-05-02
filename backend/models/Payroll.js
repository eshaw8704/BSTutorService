import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema(
  {
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User',
      required: true,
      unique:  true          // each tutor has ONE payroll record
    },
    confirmedHours:    { type: Number, default: 0 },
    nonConfirmedHours: { type: Number, default: 0 },
    confirmedBy:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
  },
  { timestamps: true }
);

export default mongoose.model('Payroll', payrollSchema);
