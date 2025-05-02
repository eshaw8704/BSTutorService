import express from 'express';
import {
  getAppointmentByStudent,
  getAppointmentsByTutor,
  createAppointment,
  completeAppointment,
  getLoggedAppointments,
  deleteAppointment,
  changeAppointment
} from '../controllers/appointmentController.js';

import { protect } from '../middleware/authMiddleware.js'; // assuming you have this middleware

const router = express.Router();

// 🔹 GET /api/appointments/upcoming
router.get('/upcoming', protect, getUpcomingForStudent);

// 🔹 POST /api/appointments
router.post('/', protect, createAppointment);

// 🔹 GET /api/appointments/:studentID
router.get('/:studentID', protect, getAppointmentByStudent);

// 🔹 GET /api/appointments/tutor/:tutorID
router.get('/tutor/:tutorID', protect, getAppointmentsByTutor);

// 🔹 PATCH /api/appointments/:appointmentId/complete
router.patch('/:appointmentId/complete', protect, completeAppointment);

// 🔹 GET /api/appointments/logged
router.get('/logged', protect, getLoggedAppointments);

// 🔹 DELETE /api/appointments/:appointmentId
router.delete('/:appointmentId', protect, deleteAppointment);

// 🔹 PUT /api/appointments/:appointmentId
router.put('/:appointmentId', protect, changeAppointment);

export default router;
