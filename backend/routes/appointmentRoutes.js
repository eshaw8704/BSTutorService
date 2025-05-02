import express from 'express';
import {
  getAppointmentByStudent,
  getAppointmentsByTutor,
  createAppointment,
  completeAppointment,
  getLoggedAppointments 
} from '../controllers/appointmentController.js';
import { getAppointmentByStudent, createAppointment } from '../controllers/appointmentController.js';
import { deleteAppointment } from '../controllers/deleteAppointmentController.js';
import { changeAppointment } from '../controllers/changeAppointmentController.js';


const router = express.Router();

// Create a new appointment
router.post('/', createAppointment);

// Get all appointments for a specific student
router.get('/:studentID', getAppointmentByStudent);

// Get all appointments for a specific tutor
router.get('/appointments/tutor/:tutorID', getAppointmentsByTutor);

// Mark an appointment as completed
router.patch('/:appointmentId/complete', completeAppointment);
// Route to get appointments by student ID
router.post('/appointments', createAppointment);

// Route to delete an appointment
router.delete('/appointments/:appointmentId', deleteAppointment);


// Route to reschedule an appointment
router.put('/appointments/:appointmentId', changeAppointment);

export default router;
