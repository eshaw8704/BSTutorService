import express from 'express';
import {
  getAllAppointments,
  updateAppointment,
  cancelAppointment,
  getLoggedAppointments  // or import from adminController if you split
} from '../controllers/adminController.js';

const router = express.Router();

// View all appointments
router.get('/appointments', getAllAppointments);

// Reschedule an appointment
router.put('/appointments/:appointmentId', updateAppointment);

// Cancel an appointment
router.put('/appointments/:appointmentId/cancel', cancelAppointment);

// View all completed (logged) appointments
router.get('/logged-appointments', getLoggedAppointments);

export default router;