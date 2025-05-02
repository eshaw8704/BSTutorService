import express from 'express';
import Payroll from '../models/Payroll.js';
import { confirmPayroll } from '../controllers/payrollController.js';

const router = express.Router();

/**
 * GET /api/payroll/tutor/:tutorId
 */
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

/**
 * POST /api/payroll
 * - Tutors log hours
 * - Admins confirm pay
 */
router.post('/', async (req, res) => {
  try {
    const tutorId     = req.body.tutor ?? req.body.tutorId;
    const confirmedBy = req.body.confirmedBy;
    const hoursWorked = req.body.hoursWorked;

    if (!tutorId) {
      return res.status(400).json({ message: 'Missing tutorId' });
    }

    // ─── Tutor is logging hours ───
    if (hoursWorked != null) {
      let payroll = await Payroll.findOne({ tutor: tutorId });
      if (!payroll) {
        payroll = new Payroll({
          tutor:             tutorId,
          confirmedHours:    0,
          nonConfirmedHours: 0,
        });
      }
      payroll.nonConfirmedHours += hoursWorked;
      await payroll.save();
      await payroll.populate('tutor', 'firstName lastName');
      return res.json(payroll);
    }

    // ─── Admin is confirming pay (legacy) ───
    if (!confirmedBy) {
      return res.status(400).json({ message: 'Missing confirmedBy' });
    }
    const payroll = await Payroll.findOne({ tutor: tutorId });
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }
    payroll.confirmedHours += payroll.nonConfirmedHours;
    payroll.nonConfirmedHours = 0;
    payroll.confirmedBy = confirmedBy;
    payroll.confirmedAt = new Date();
    await payroll.save();
    await payroll.populate('tutor', 'firstName lastName');
    return res.json(payroll);
  } catch (err) {
    console.error('Error handling payroll POST:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔹 Confirm payroll + send tutor email
router.post('/confirm', confirmPayroll);

export default router;
