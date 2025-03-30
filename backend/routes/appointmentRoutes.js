import express from 'express';
import { createAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

// Route to get appointments by student ID
router.post('/appointments', createAppointment);

export default router;