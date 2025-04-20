import express from 'express';
import { getAppointmentsByTutor } from '../controllers/appointmentController.js';
import { getAppointmentByStudent, createAppointment, completeAppointment } from '../controllers/appointmentController.js';

// This route handles appointment-related operations
const router = express.Router();

// student books an appointment
router.get('/appointments/:studentID', getAppointmentByStudent);

// tutor’s “upcoming” (booked) sessions
router.get('/appointments/tutor/:tutorID', getAppointmentsByTutor);

router.post('/appointments', createAppointment);
// mark an appointment as Completed
router.patch('/appointments/:appointmentId/complete', completeAppointment);

router.get('/appointments/tutor/:tutorID', getAppointmentsByTutor);

export default router;