// controllers/payrollController.js
import Payroll from '../models/Payroll.js';
import { sendEmailReceipt } from '../utils/sendEmail.js';

export const getPayrollForTutor = async (req, res) => {
  // GET /api/payroll/tutor/:tutorId
  // Returns the payroll for a specific tutor
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
  const { tutorId }     = req.params;
  const { confirmedBy } = req.body;          // admin ID

  if (!confirmedBy) {
    return res.status(400).json({ message: 'Missing confirmedBy' });
  }

  try {
    let payroll = await Payroll.findOne({ tutor: tutorId });
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    // 1) Move unconfirmed → confirmed
    payroll.confirmedHours   += payroll.unconfirmedHours;
    payroll.unconfirmedHours  = 0;
    payroll.confirmedBy       = confirmedBy;
    payroll.confirmedAt       = new Date();
    await payroll.save();

    // 2) Reload with tutor email
    payroll = await payroll.populate('tutor', 'firstName lastName email');

    // 3) Send notification email
    try {
      await sendEmailReceipt({
        to:      payroll.tutor.email,
        subject: 'Your payroll has been confirmed',
        html: `
          <p>Hi ${payroll.tutor.firstName},</p>
          <p>Your payroll on ${payroll.confirmedAt.toLocaleDateString()} has been <strong>confirmed</strong>.</p>
          <ul>
            <li><strong>Confirmed Hours:</strong> ${payroll.confirmedHours}</li>
            <li><strong>Unconfirmed Hours:</strong> ${payroll.unconfirmedHours}</li>
          </ul>
          <p>Thanks for your work!</p>
        `
      });
    } catch (emailErr) {
      console.error('❌ Email failed:', emailErr);
      // not blocking: we still return 200
    }

    // 4) Respond with updated payroll
    res.json(payroll);
  } catch (err) {
    console.error('Error confirming payroll:', err);
    res.status(500).json({ message: 'Server error' });
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