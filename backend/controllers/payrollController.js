import User from '../models/User.js';
import Payroll from '../models/payroll.js';
import { sendEmailReceipt } from '../utils/sendEmail.js';

export const getPayrollForTutor = async (req, res) => {
  const { tutorId } = req.params;
  try {
    const payroll = await Payroll
      .findOne({ tutor: tutorId })
      .populate('tutor', 'firstName lastName email');
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }
    res.json(payroll);
  } catch (err) {
    console.error('Error fetching payroll:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

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
    const earnings = payroll.confirmedHours * 20;
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
          <li><strong>Total Earnings:</strong> $${earnings.toFixed(2)}</li>
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

// POST /api/payroll/tutor/:tutorId
// Logs hours for a specific tutor
export const logHoursForTutor = async (req, res) => {
  const { tutorId } = req.params;
  const { date, hours, notes } = req.body;
  if (!date || hours == null) {
    return res.status(400).json({ message: 'Date and hours are required.' });
  }
  try {
    let payroll = await Payroll.findOne({ tutor: tutorId });
    if (!payroll) {
      payroll = new Payroll({ tutor: tutorId });
    }
    payroll.unconfirmedHours += Number(hours);
    // optionally store notes/date in another field if you want details
    await payroll.save();
    res.status(201).json(payroll);
  } catch (err) {
    console.error('Error logging hours:', err);
    res.status(500).json({ message: 'Server error' });
  }
};