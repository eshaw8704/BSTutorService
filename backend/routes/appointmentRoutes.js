import express from 'express';
import Appointment from '../models/Appointment.js';
import { protect } from '../middleware/auth.js';
import {
  getAppointmentByStudent,
  getAppointmentsByTutor,
  createAppointment,
  completeAppointment,
  getLoggedAppointments,
  deleteAppointment,
  changeAppointment,
  getUpcomingForStudent,
  updateAppointment,
  getBookedTimesByTutor
} from '../controllers/appointmentController.js';

const router = express.Router();

// 🔹 Student's upcoming appts
router.get('/upcoming', protect, getUpcomingForStudent);

// 🔹 Create new appt
router.post('/', protect, createAppointment);

// 🔹 Update appt info
router.patch('/:appointmentId/update', protect, updateAppointment);

// 🔹 Change date/time for reschedule
router.patch('/:appointmentId/change', protect, changeAppointment);

// 🔹 Complete appt
router.patch('/:appointmentId/complete', protect, completeAppointment);

// 🔹 Delete appt
router.delete('/:appointmentId', protect, deleteAppointment);

// 🔹 Get student history
router.get('/:studentID', protect, getAppointmentByStudent);

// 🔹 Get tutor appts
router.get('/tutor/:tutorID', protect, getAppointmentsByTutor);

// 🔹 Get booked times for tutor
router.get('/tutor/:tutorID/booked-times', protect, getBookedTimesByTutor);

// 🔹 Admin view: All upcoming appts
router.get('/all/upcoming', async (req, res) => {
  try {
    const now = new Date();
    const upcoming = await Appointment.find({ appointmentDate: { $gte: now } })
      .sort({ appointmentDate: 1 })
      .populate('student tutor', 'firstName lastName email');
    res.json(upcoming);
  } catch (err) {
    console.error('❌ Error fetching upcoming appointments:', err);
    res.status(500).json({ message: 'Failed to fetch upcoming appointments' });
  }
});

// 🔹 Admin view: History
router.get('/all/history', async (req, res) => {
  try {
    const now = new Date();
    const history = await Appointment.find({ appointmentDate: { $lt: now } })
      .sort({ appointmentDate: -1 })
      .populate('student tutor', 'firstName lastName email');
    res.json(history);
  } catch (err) {
    console.error('❌ Error fetching appointment history:', err);
    res.status(500).json({ message: 'Failed to fetch appointment history' });
  }
});

export default router;
