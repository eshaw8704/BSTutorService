import User from '../models/User.js';
import { sendEmailReceipt } from '../utils/sendEmail.js';

// Find tutor info
const tutor = await User.findById(tutorId);
if (!tutor) return res.status(404).json({ message: 'Tutor not found' });
try {
  // Send email receipt
await sendEmailReceipt({
  to: tutor.email,
  subject: 'Payroll Confirmed',
  html: `
    <h3>Hi ${tutor.firstName},</h3>
    <p>Your payroll has been confirmed and your earnings have been updated.</p>
    <p>Thank you for tutoring with BSTutors!</p>
    <br>
    <small>— BSTutors Admin Team</small>
  `
});
} catch (err) {
  console.error('❌ Failed to send confirmation email:', err);
}



export const createPayroll = async (req, res) => {
  try {
    console.log("📦 Incoming payroll body:", req.body);

    const { tutor, confirmedHours, nonConfirmedHours, confirmedBy } = req.body;

    if (!tutor || !confirmedHours || !nonConfirmedHours || !confirmedBy) {
      return res.status(400).json({
        message: "Missing required fields",
        body: req.body
      });
    }

    const newPayroll = await Payroll.create({
      tutor,
      confirmedHours,
      nonConfirmedHours,
      confirmedBy
    });

    res.status(201).json(newPayroll);
  } catch (error) {
    console.error("❌ Error creating payroll record:", error);
    res.status(500).json({ message: "Failed to create payroll record" });
  }
};
