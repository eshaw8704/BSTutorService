import express from 'express';
import { getLoggedAppointments } from '../controllers/appointmentController.js';

// This route handles admin-specific operations related to appointments
const router = express.Router();

// Endpoint to get all logged (completed) appointments
router.get('/logged-appointments', getLoggedAppointments);

export default router;
// Will allow the admin to view all appointments that have been marked as completed.