import Appointment from '../models/Appointment.js';
import { updateUnconfirmedHours } from '../utils/payrollUtils.js';

// GET appointments by student ID
export const getAppointmentByStudent = async (req, res) => {
  try {
    const appointments = await Appointment.find({ student: req.params.studentID });
    res.json(appointments);
  } catch (err) {
    console.error("❌ Error fetching appointments by student:", err);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

// GET appointments by tutor ID
export const getAppointmentsByTutor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ tutor: req.params.tutorID });
    res.json(appointments);
  } catch (err) {
    console.error("❌ Error fetching appointments by tutor:", err);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

// POST create new appointment
export const createAppointment = async (req, res) => {
  const { student, tutor, subject, time } = req.body;

  console.log("📥 Incoming appointment data:", req.body);

  // Validate required fields
  if (!student || !tutor || !subject || !time) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newAppointment = new Appointment({
      student,
      tutor,
      subject,
      time,
      status: 'scheduled'
    });

    await newAppointment.save();
    console.log("✅ Appointment created:", newAppointment);

    res.status(201).json(newAppointment);
  } catch (err) {
    console.error("❌ Failed to create appointment:", err);
    res.status(400).json({ message: 'Failed to create appointment' });
  }
};

// PATCH mark appointment as complete and update tutor payroll
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

    res.json({ message: 'Appointment completed and payroll updated' });
  } catch (err) {
    console.error("❌ Failed to complete appointment:", err);
    res.status(500).json({ message: 'Failed to complete appointment' });
  }
};

// GET all completed appointments (admin logging)
export const getLoggedAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: 'completed' });
    res.json(appointments);
  } catch (err) {
    console.error("❌ Failed to get logged appointments:", err);
    res.status(500).json({ message: 'Failed to get logged appointments' });
  }
};
