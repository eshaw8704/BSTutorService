import express from 'express';
import { getAppointmentByStudent, createAppointment, completeAppointment } from '../controllers/appointmentController.js';

// This route handles appointment-related operations
const router = express.Router();

router.get('/appointments/:studentID', getAppointmentByStudent);
router.post('/appointments', createAppointment);
// mark an appointment as Completed
router.patch('/appointments/:appointmentId/complete', completeAppointment);

export default router;