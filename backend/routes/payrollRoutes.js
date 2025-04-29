// routes/payrollRoutes.js
import express from 'express';
import Payroll from '../models/Payroll.js';

const router = express.Router();

/**
 * GET /api/payroll/tutor/:tutorId
 * – Returns (and auto-creates if missing) a payroll record for that tutor.
 */
router.get('/tutor/:tutorId', async (req, res) => {
  try {
    const { tutorId } = req.params;
    let record = await Payroll.findOne({ tutor: tutorId })
      .populate('tutor', 'firstName lastName')
      .populate('confirmedBy', 'firstName lastName');

    if (!record) {
      record = await Payroll.create({ tutor: tutorId });
    }

    // wrap in array to match front-end expectations
    res.json([record]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching payroll.' });
  }
});

/**
 * POST /api/payroll
 * Body: { tutor, hoursWorked, date? }
 * – Appends hoursWorked to nonConfirmedHours.
 */
router.post('/', async (req, res) => {
  try {
    const { tutor, hoursWorked = 0, date } = req.body;
    if (!tutor) return res.status(400).json({ message: 'Missing tutor ID.'});

    let record = await Payroll.findOne({ tutor });
    if (!record) {
      record = await Payroll.create({
        tutor,
        nonConfirmedHours: hoursWorked,
        createdAt: date || undefined
      });
    } else {
      record.nonConfirmedHours += hoursWorked;
      if (date) record.createdAt = date;
      await record.save();
    }

    res.json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding hours.' });
  }
});

// ← this is the key line your server.js import needs
export default router;
