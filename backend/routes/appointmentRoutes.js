import express from 'express';
import {
  getAppointmentByStudent,
  getAppointmentsByTutor,
  createAppointment,
  completeAppointment,
} from '../controllers/appointmentController.js';

const router = express.Router();

// GET appointments for a specific student
router.get('/:studentID', getAppointmentByStudent);

// GET appointments for a specific tutor
router.get('/appointments/tutor/:tutorID', getAppointmentsByTutor);

// POST create a new appointment
router.post('/', createAppointment);

// PATCH mark appointment as completed and update payroll
router.patch('/appointments/:appointmentId/complete', completeAppointment);

export default router;
