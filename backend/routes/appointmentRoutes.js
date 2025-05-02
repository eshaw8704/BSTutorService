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

// 🔹 GET /api/appointments/upcoming
router.get('/upcoming', protect, getUpcomingForStudent);

// 🔹 POST /api/appointments
router.post('/', createAppointment);

// 🔹 GET /api/appointments/:studentID
router.get('/:studentID', protect, getAppointmentByStudent);
// Get all appointments for a specific student
router.get('/:studentID', getAppointmentByStudent);

// 🔹 GET /api/appointments/tutor/:tutorID
//     (formerly /appointments/appointments/...)
//     now correctly mounted at /api/appointments/tutor/:tutorID
router.get('/tutor/:tutorID', protect, getAppointmentsByTutor);
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
