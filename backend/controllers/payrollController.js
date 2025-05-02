import Payroll from '../models/Payroll.js';
import User from '../models/User.js';
import { sendEmailReceipt } from '../utils/mailer.js';

export const confirmPayroll = async (req, res) => {
  try {
    const { tutor, confirmedBy } = req.body;

    if (!tutor || !confirmedBy) {
      return res.status(400).json({ message: 'Missing tutor or confirmedBy' });
    }

    const payroll = await Payroll.findOne({ tutor });
    if (!payroll) return res.status(404).json({ message: 'Payroll not found for this tutor' });

    const hoursConfirmed = payroll.nonConfirmedHours;
    payroll.confirmedHours += hoursConfirmed;
    payroll.nonConfirmedHours = 0;
    payroll.confirmedBy = confirmedBy;
    await payroll.save();

    const tutorDoc = await User.findById(tutor);
    if (!tutorDoc) return res.status(404).json({ message: 'Tutor user not found' });

    const html = `
      <h2>Hi ${tutorDoc.firstName},</h2>
      <p>Your payroll has been successfully processed.</p>
      <ul>
        <li><strong>Confirmed This Cycle:</strong> ${hoursConfirmed} hours</li>
        <li><strong>Total Confirmed Hours:</strong> ${payroll.confirmedHours} hours</li>
        <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
      </ul>
      <p>Thank you for your dedication!</p>
    `;

    console.log('📨 Preparing to send email to', tutorDoc.email); // ✅ Added
    await sendEmailReceipt({
      to: tutorDoc.email,
      subject: 'BSTutors Payroll Confirmation',
      html,
    });
    console.log('✅ sendEmailReceipt() called');

    res.status(200).json({ message: 'Payroll confirmed and email sent', payroll });
  } catch (err) {
    console.error('❌ Payroll confirmation failed:', err);
    res.status(500).json({ message: 'Server error during payroll confirmation' });
  }
};
