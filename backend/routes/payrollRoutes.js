// backend/routes/payrollRoutes.js

import express from 'express';
import {
  getPayrollForTutor,
  confirmPayrollForTutor
} from '../controllers/payrollController.js';
import Payroll from '../models/Payroll.js';

const router = express.Router();

// GET  /api/payroll/tutor/:tutorId — fetch payroll
router.get('/tutor/:tutorId', getPayrollForTutor);

// PUT  /api/payroll/tutor/:tutorId — confirm payroll
router.put('/tutor/:tutorId', confirmPayrollForTutor);

// POST /api/payroll — log hours or confirm (legacy dual-function)
router.post('/', async (req, res) => {
  try {
    const tutorId     = req.body.tutor ?? req.body.tutorId;
    const confirmedBy = req.body.confirmedBy;
    const hoursWorked = req.body.hoursWorked;

    if (!tutorId) {
      return res.status(400).json({ message: 'Missing tutorId' });
    }

    // Tutor logging hours
    if (hoursWorked != null) {
      let payroll = await Payroll.findOne({ tutor: tutorId });
      if (!payroll) {
        payroll = new Payroll({
          tutor: tutorId,
          confirmedHours: 0,
          unconfirmedHours: 0,
        });
      }
      payroll.unconfirmedHours += hoursWorked;
      await payroll.save();
      await payroll.populate('tutor', 'firstName lastName');
      return res.json(payroll);
    }

    // Admin confirming payroll (legacy path)
    if (!confirmedBy) {
      return res.status(400).json({ message: 'Missing confirmedBy' });
    }

    const payroll = await Payroll.findOne({ tutor: tutorId });
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll not found' });
    }

    payroll.confirmedHours += payroll.unconfirmedHours;
    payroll.unconfirmedHours = 0;
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

export default router;
