import express from 'express';
import { createPayroll } from '../controllers/payrollController.js';
import { Payroll } from '../models/Payroll.js'; // ✅ Add this

const router = express.Router();

router.post('/', createPayroll);

// ✅ Route for tutors to view their own payroll
router.get('/tutor/:tutorId', async (req, res) => {
  try {
    const records = await Payroll.find({ tutor: req.params.tutorId })
      .populate('confirmedBy', 'firstName lastName');
    res.json(records);
  } catch (error) {
    console.error("Error fetching tutor payroll:", error);
    res.status(500).json({ message: "Failed to fetch payroll data" });
  }
});

export default router;
