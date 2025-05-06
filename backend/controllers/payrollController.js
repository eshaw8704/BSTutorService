import User from '../models/User.js';
import Payroll from '../models/Payroll.js';
import { sendEmailReceipt } from '../utils/sendEmail.js';

export const confirmPayrollForTutor = async (req, res) => {
  const { tutorId } = req.params;
  const { confirmedBy } = req.body;

  if (!confirmedBy) {
    return res.status(400).json({ message: 'Missing confirmedBy' });
  }

  try {
    // Check if tutor exists
    const tutor = await User.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ message: 'Tutor not found' });
    }

    // Fetch payroll
    let payroll = await Payroll.findOne({ tutor: tutorId });
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    // Merge unconfirmed hours into confirmed
    payroll.confirmedHours += payroll.unconfirmedHours;
    payroll.unconfirmedHours = 0;
    payroll.confirmedBy = confirmedBy;
    payroll.confirmedAt = new Date();
    payroll.confirmed = true;

    await payroll.save();
    await payroll.populate('tutor', 'firstName lastName email');

    // Send confirmation email
    await sendEmailReceipt({
      to: tutor.email,
      subject: 'Your payroll has been confirmed',
      html: `
        <p>Hi ${tutor.firstName},</p>
        <p>Your hours on ${payroll.confirmedAt.toLocaleDateString()} have been confirmed.</p>
        <ul>
          <li><strong>Confirmed Hours:</strong> ${payroll.confirmedHours}</li>
          <li><strong>Unconfirmed Hours:</strong> ${payroll.unconfirmedHours}</li>
        </ul>
        <p>Thank you for tutoring with BSTutors!</p>
        <br>
        <small>— BSTutors Admin Team</small>
      `
    });

    return res.json(payroll);
  } catch (err) {
    console.error('Error confirming payroll:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
export const getPayrollForTutor = async (req, res) => {
  try {
    const { tutorId } = req.params;

    const payroll = await Payroll
      .findOne({ tutor: tutorId })
      .populate('tutor', 'firstName lastName email');

    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    return res.json(payroll);
  } catch (err) {
    console.error('Error fetching payroll:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};