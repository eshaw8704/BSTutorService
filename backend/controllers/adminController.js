import Appointment from '../models/Appointment.js';

// Fetch all appointments (admin)
export const getAllAppointments = async (req, res) => {
  try {
    const appts = await Appointment.find()
      .populate('student', 'firstName lastName email')
      .populate('tutor', 'firstName lastName email');
    res.json(appts);
  } catch (err) {
    console.error('Error fetching all appointments:', err);
    res.status(500).json({ message: 'Error fetching all appointments' });
  }
};

// Reschedule an appointment (admin)
export const updateAppointment = async (req, res) => {
  try {
    const { appointmentDate, appointmentTime } = req.body;
    const appt = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      { appointmentDate, appointmentTime },
      { new: true }
    )
      .populate('student', 'firstName lastName email')
      .populate('tutor', 'firstName lastName email');    res.json(appt);
  } catch (err) {
    console.error('Error updating appointment:', err);
    res.status(400).json({ message: err.message });
  }
};

// Cancel an appointment (admin)
export const cancelAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      { status: 'Cancelled' },
      { new: true }
    )
      .populate('student', 'firstName lastName email')
      .populate('tutor', 'firstName lastName email');    res.json(appt);
  } catch (err) {
    console.error('Error cancelling appointment:', err);
    res.status(400).json({ message: err.message });
  }
};

// View all completed (logged) appointments
export const getLoggedAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: 'Completed' })
      .populate('student', 'firstName lastName email')
      .populate('tutor', 'firstName lastName email');
    res.json(appointments);
  } catch (err) {
    console.error('Error fetching logged appointments:', err);
    res.status(500).json({ message: 'Error fetching logged appointments' });
  }
};