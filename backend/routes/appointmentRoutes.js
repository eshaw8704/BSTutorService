import express from 'express';
import { getAppointmentByStudent, createAppointment } from '../controllers/appointmentController.js';
import { getAppointmentsByTutor } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/appointments/:studentID', getAppointmentByStudent);
router.post('/appointments', createAppointment);

router.get('/appointments/tutor/:tutorID', getAppointmentsByTutor);

export default router;