import express from 'express';
import { getAppointmentsByStudent } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/appointments/:studentID', getAppointmentByStudent);

export default router;