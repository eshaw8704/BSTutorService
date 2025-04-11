import express from 'express';
import { getAppointmentByStudent, createAppointment } from '../controllers/appointmentController.js';
import { deleteAppointment } from '../controllers/deleteAppointmentController.js';
import { changeAppointment } from '../controllers/changeAppointmentController.js';


const router = express.Router();

router.get('/appointments/:studentID', getAppointmentByStudent);
router.post('/appointments', createAppointment);

// Route to delete an appointment
router.delete('/appointments/:appointmentId', deleteAppointment);


// Route to reschedule an appointment
router.put('/appointments/:appointmentId', changeAppointment);

export default router;