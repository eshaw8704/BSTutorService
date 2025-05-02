import express from 'express';
import {
  getUpcomingForStudent,
  getAppointmentByStudent,
  getAppointmentsByTutor,
  createAppointment,
  completeAppointment,
  getLoggedAppointments,
  updateAppointment,
  deleteAppointment
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// 🔹 GET /api/appointments/upcoming - fetch future appointments for logged-in student
router.get('/upcoming', protect, getUpcomingForStudent);

// Create a new appointment
router.post('/', protect, createAppointment);
 
router.patch('/:appointmentId/update', protect, updateAppointment);

// Get all appointments for a specific student
router.get('/:studentID', protect, getAppointmentByStudent);

// Get all appointments for a specific tutor
router.get('/appointments/tutor/:tutorID', protect, getAppointmentsByTutor);

// Mark an appointment as completed
router.patch('/:appointmentId/complete', protect, completeAppointment);

// Admin: get all completed appointments
router.get('/logged', protect, getLoggedAppointments);

// ability to cancel appointments outright
router.delete('/:appointmentId', protect, deleteAppointment);

export default router;