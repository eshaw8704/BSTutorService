// backend/routes/payrollRoutes.js
import express from 'express';
import Payroll from '../models/Payroll.js';

const router = express.Router();

// GET payroll info for tutor
// GET payroll info for tutor — auto-create if not found
router.get('/:tutorId', async (req, res) => {
  const { tutorId } = req.params;

  try {
    let payroll = await Payroll.findOne({ tutor: tutorId });

    // 🔧 Auto-create if not found
    if (!payroll) {
      payroll = await Payroll.create({ tutor: tutorId });
    }

    res.json({
      confirmedHours: payroll.confirmedHours,
      nonConfirmedHours: payroll.nonConfirmedHours
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error loading payroll.' });
  }
});


// POST confirm payroll (move nonConfirmed ➝ confirmed)
router.post('/', async (req, res) => {
  const { tutor, confirmedBy } = req.body;

  if (!tutor || !confirmedBy) {
    return res.status(400).json({ message: 'Missing tutor or admin ID.' });
  }

  try {
    const payroll = await Payroll.findOne({ tutor });
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll record not found.' });
    }

    payroll.confirmedHours += payroll.nonConfirmedHours;
    payroll.nonConfirmedHours = 0;
    payroll.confirmedBy = confirmedBy;
    await payroll.save();

    res.json({
      message: 'Payroll confirmed successfully.',
      updatedConfirmedHours: payroll.confirmedHours,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

export default router;
