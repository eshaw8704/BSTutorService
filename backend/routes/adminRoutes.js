import express from 'express';
import { protect } from '../middleware/auth.js';    
import Appointment from '../models/Appointment.js';  

const router = express.Router();                    

router.get('/appointments', protect, async (req, res) => {
  try {
    const appts = await Appointment
      .find({})
      .populate('student', 'firstName lastName')
      .populate('tutor',   'firstName lastName');

    // only keep ones where both populated
    const good = appts.filter(a => a.student && a.tutor);

    const payload = good.map(a => ({
      _id: a._id,
      subject: a.subject,
      // keep the raw ISO string; let the front end decide how to split date/time
      appointmentTime: a.appointmentTime,
      appointmentDate: a.appointmentDate,
      studentName: `${a.student.firstName} ${a.student.lastName}`,
      tutorName:   `${a.tutor.firstName} ${a.tutor.lastName}`,
    }));

    res.json(payload);
  } catch (err) {
    console.error('Error in adminRoutes GET /appointments:', err);
    res.status(500).json({ message: 'Server error fetching appointments.' });
  }
});

router.delete('/appointments/:id', protect, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error deleting appointment.' });
  }
});

export default router;