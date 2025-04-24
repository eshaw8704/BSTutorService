import Appointment from '../models/Appointment.js';
import { updateUnconfirmedHours } from '../utils/payrollUtils.js';

// Function to convert ISO string into a valid time
const convertToValidTime = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const timeMap = {
    8: '08:00 AM',
    9: '09:00 AM',
    10: '10:00 AM',
    11: '11:00 AM',
    13: '01:00 PM',
    14: '02:00 PM',
    15: '03:00 PM',
  };

  const timeString = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  return timeMap[hours] || null;
};

// GET appointments by student ID
export const getAppointmentByStudent = async (req, res) => {
  try {
    const appointments = await Appointment.find({ student: req.params.studentID });
    res.json(appointments);
  } catch (err) {
    console.error("❌ Error fetching appointments by student:", err);
    res.status(500).json({ message: 'Error fetching appointments by student' });
  }
};

// GET appointments by tutor ID
export const getAppointmentsByTutor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ tutor: req.params.tutorID });
    res.json(appointments);
  } catch (err) {
    console.error("❌ Error fetching appointments by tutor:", err);
    res.status(500).json({ message: 'Error fetching appointments by tutor' });
  }
};

// POST create new appointment
export const createAppointment = async (req, res) => {
  const { student, tutor, subject, appointmentTime, appointmentDate } = req.body;

  console.log("📥 Incoming appointment data:", req.body);

  if (!student || !tutor || !subject || !appointmentTime || !appointmentDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const parsedAppointmentDate = new Date(appointmentDate);
  if (isNaN(parsedAppointmentDate)) {
    return res.status(400).json({ message: "Invalid appointment date" });
  }

  const validAppointmentTime = convertToValidTime(appointmentTime);
  if (!validAppointmentTime) {
    return res.status(400).json({ message: "Invalid appointment time" });
  }

  try {
    const newAppointment = new Appointment({
      student,
      tutor,
      subject,
      appointmentTime: validAppointmentTime,
      appointmentDate: parsedAppointmentDate,
      status: 'scheduled',
    });

    await newAppointment.save();
    console.log("✅ Appointment created:", newAppointment);
    res.status(201).json(newAppointment);
  } catch (err) {
    console.error("❌ Failed to create appointment:", err);
    res.status(400).json({ message: 'Failed to create appointment' });
  }
};

// PATCH mark appointment as completed and update tutor payroll
export const completeAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    if (appointment.status === 'completed') {
      return res.status(400).json({ message: 'Appointment already marked complete' });
    }
    appointment.status = 'completed';
    await appointment.save();
    await updateUnconfirmedHours(appointment.tutor);
    res.json({ message: 'Appointment completed successfully' });
  } catch (err) {
    console.error("❌ Failed to complete appointment:", err);
    res.status(500).json({ message: 'Failed to complete appointment' });
  }
};
export const getLoggedAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: 'completed' });
    res.json(appointments);
  } catch (err) {
    console.error("❌ Failed to get logged appointments:", err);
    res.status(500).json({ message: 'Failed to get logged appointments' });
  }
};
// No further export statement needed—each function above is already a named export
