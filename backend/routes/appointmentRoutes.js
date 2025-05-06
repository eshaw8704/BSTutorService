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
  getUpcomingForStudent,
  deleteAppointment,
} from '../controllers/appointmentController.js';




const router = express.Router();

// 🔹 GET /api/appointments/upcoming
router.get('/upcoming', protect, getUpcomingForStudent);

// 🔹 POST /api/appointments
router.post('/', protect, createAppointment);

router.patch('/:appointmentId/update', protect, updateAppointment);

// 🔹 GET /api/appointments/:studentID
router.get('/:studentID', protect, getAppointmentByStudent);

// 🔹 GET /api/appointments/tutor/:tutorID
router.get('/tutor/:tutorID', protect, getAppointmentsByTutor);

// 🔹 PATCH /api/appointments/:appointmentId/complete
router.patch('/:appointmentId/complete', protect, completeAppointment);

// 🔹 GET /api/appointments/logged
router.get('/logged', protect, getLoggedAppointments);

// 🔹 DELETE /api/appointments/:appointmentId
router.delete('/:appointmentId', protect, deleteAppointment);

// 🔹 PUT /api/appointments/:appointmentId
router.put('/:appointmentId', protect, changeAppointment);

// 🔹 GET /api/appointments/all/upcoming (admin)
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

// 🔹 GET /api/appointments/all/history (admin)
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
