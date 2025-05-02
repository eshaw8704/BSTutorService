import express from 'express';
import {
  getUpcomingForStudent,
  getAppointmentByStudent,
  getAppointmentsByTutor,
  createAppointment,
  completeAppointment,
  getLoggedAppointments,
  updateAppointment,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { protect } from '../middleware/auth.js';
import { changeAppointment } from '../controllers/rescheduleController.js';

const router = express.Router();

// 🔹 GET /api/appointments/upcoming
router.get('/upcoming', protect, getUpcomingForStudent);

// 🔹 POST /api/appointments
router.post('/', protect, createAppointment);

router.patch('/:appointmentId/update', protect, updateAppointment);

// 🔹 GET /api/appointments/:studentID
router.get('/:studentID', protect, getAppointmentByStudent);

// 🔹 GET /api/appointments/tutor/:tutorID
//     (formerly /appointments/appointments/...)
//     now correctly mounted at /api/appointments/tutor/:tutorID
router.get('/tutor/:tutorID', protect, getAppointmentsByTutor);

// 🔹 PATCH /api/appointments/:appointmentId/complete
router.patch('/:appointmentId/complete', protect, completeAppointment);

// 🔹 GET /api/appointments/logged
router.get('/logged', protect, getLoggedAppointments);

// ability to cancel appointments outright
router.delete('/:appointmentId', protect, deleteAppointment);

//reschedule appointments
router.patch('/:appointmentId/change', protect, changeAppointment);

export default router;
