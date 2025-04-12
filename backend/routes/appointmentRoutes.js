import express from 'express';
import { getAppointmentByStudent, createAppointment } from '../controllers/appointmentController.js';
import { getAppointmentsByTutor } from '../controllers/appointmentController.js';
import { getAppointmentByStudent, createAppointment, completeAppointment } from '../controllers/appointmentController.js';

// This route handles appointment-related operations
const router = express.Router();

router.get('/appointments/:studentID', getAppointmentByStudent);
router.post('/appointments', createAppointment);
// mark an appointment as Completed
router.patch('/appointments/:appointmentId/complete', completeAppointment);

router.get('/appointments/tutor/:tutorID', getAppointmentsByTutor);

export default router;