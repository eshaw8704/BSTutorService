// controllers/payrollController.js

import Payroll from '../models/Payroll.js';
import { sendEmailReceipt } from '../utils/sendEmail.js';

export const getPayrollForTutor = async (req, res) => {
  const { tutorId } = req.params;
  try {
    let payroll = await Payroll
      .findOne({ tutor: tutorId })
      .populate('tutor', 'firstName lastName email');

    // If none exists yet, create a fresh record
    if (!payroll) {
      payroll = new Payroll({
        tutor:            tutorId,
        confirmedHours:   0,
        unconfirmedHours: 0,
        confirmed:        false
      });
      await payroll.save();
      payroll = await payroll.populate('tutor', 'firstName lastName email');
    }

    return res.json(payroll);
  } catch (err) {
    console.error('Error fetching payroll:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const confirmPayrollForTutor = async (req, res) => {
  const { tutorId }     = req.params;
  const { confirmedBy } = req.body;

  if (!confirmedBy) {
    return res.status(400).json({ message: 'Missing confirmedBy' });
  }

  try {
    let payroll = await Payroll.findOne({ tutor: tutorId });
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    // Merge hours and reset
    payroll.confirmedHours   += payroll.unconfirmedHours;
    payroll.unconfirmedHours  = 0;
    payroll.confirmedBy       = confirmedBy;
    payroll.confirmedAt       = new Date();
    payroll.confirmed         = true;

    await payroll.save();
    payroll = await payroll.populate('tutor', 'firstName lastName email');

    // Send notification
    sendEmailReceipt({
      to:      payroll.tutor.email,
      subject: 'Your payroll has been confirmed',
      html: `
        <p>Hi ${payroll.tutor.firstName},</p>
        <p>Your hours on ${payroll.confirmedAt.toLocaleDateString()} have been confirmed.</p>
        <ul>
          <li><strong>Confirmed Hours:</strong> ${payroll.confirmedHours}</li>
          <li><strong>Unconfirmed Hours:</strong> ${payroll.unconfirmedHours}</li>
        </ul>`
    }).catch(e => console.error('Email error:', e));

    return res.json(payroll);
  } catch (err) {
    console.error('Error confirming payroll:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
