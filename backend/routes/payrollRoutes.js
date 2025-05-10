// routes/payrollRoutes.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getPayrollForTutor,
  confirmPayrollForTutor,
  logHoursForTutor
} from '../controllers/payrollController.js';
import Payroll from '../models/payroll.js';

const router = express.Router();

// GET  /api/payroll/tutor/:tutorId — fetch payroll
router.get('/tutor/:tutorId', protect, getPayrollForTutor);

// PUT  /api/payroll/tutor/:tutorId — confirm payroll
router.put('/tutor/:tutorId', protect, confirmPayrollForTutor);

// POST /api/payroll/tutor/:tutorId/log-hours — log hours manually
router.post('/tutor/:tutorId/log-hours', protect, logHoursForTutor);

export default router;
