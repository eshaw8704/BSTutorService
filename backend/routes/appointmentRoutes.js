import express from 'express';
import { getAppointmentByStudent, createAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/appointments/:studentID', getAppointmentByStudent);
router.post('/appointments', createAppointment);

export default router;