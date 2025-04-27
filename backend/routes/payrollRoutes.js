// routes/payrollRoutes.js
import express from 'express';
import Payroll from '../models/Payroll.js';

const router = express.Router();

// ─── GET a single tutor’s payroll ───
router.get('/tutor/:tutorId', async (req, res) => {
  try {
    const { tutorId } = req.params;
    const payroll = await Payroll
      .findOne({ tutor: tutorId })
      .populate('tutor', 'firstName lastName');
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }
    res.json(payroll);
  } catch (err) {
    console.error('Error fetching payroll:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── POST to confirm payroll ───
router.post('/', async (req, res) => {
  try {
    // accept either field name:
    const tutorId     = req.body.tutor   ?? req.body.tutorId;
    const confirmedBy = req.body.confirmedBy;
    if (!tutorId || !confirmedBy) {
      return res.status(400).json({ message: 'Missing tutorId or confirmedBy' });
    }

    const payroll = await Payroll.findOne({ tutor: tutorId });
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    // Move all unconfirmed into confirmed
    payroll.confirmedHours    += payroll.nonConfirmedHours;
    payroll.nonConfirmedHours  = 0;
    payroll.confirmedBy        = confirmedBy;
    payroll.confirmedAt        = new Date();

    await payroll.save();
    await payroll.populate('tutor', 'firstName lastName');
    res.json(payroll);

  } catch (err) {
    console.error('Error confirming payroll:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
