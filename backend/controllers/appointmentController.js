import Appointment from '../models/Appointment.js';
import { updateUnconfirmedHours } from '../utils/payrollUtils.js';

// Function to convert an ISO timestamp into one of your enum strings
const convertToValidTime = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getHours();           // 0–23
  const minutes = date.getMinutes();       // 0–59
  const key = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  const timeMap = {
    '8:00':  '08:00 AM',
    '9:30':  '09:30 AM',
    '10:00': '10:00 AM',
    '11:30': '11:30 AM',
    '13:00': '01:00 PM',
    '13:30': '01:30 PM',
    '14:00': '02:00 PM',
    '14:30': '02:30 PM',
    '15:00': '03:00 PM'
  };

  return timeMap[key] || null;
};

export const getUpcomingForStudent = async (req, res) => {
  try {
    const studentId = req.user.id;            // set by your `protect` middleware

    // Include all of today by starting at midnight
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const upcoming = await Appointment.find({
      student: studentId,
      appointmentDate: { $gte: now }
    }).sort('appointmentDate');

    // Debug log to inspect exactly what's returned
    console.log(
      `getUpcomingForStudent for ${studentId} since ${now.toISOString()}:`,
      upcoming.map(a => ({
        id: a._id.toString(),
        date: a.appointmentDate.toISOString(),
        time: a.appointmentTime
      }))
    );

    res.json(upcoming);
  } catch (err) {
    console.error('❌ Error fetching upcoming appointments:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
/*console.log('getUpcomingForStudent for', req.user.id, 'now:', now, 'results:', upcoming);
*/ 
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
// GET appointments by tutor ID
export const getAppointmentsByTutor = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      tutor: req.params.tutorID
      // Remove status filter for testing
    }).populate('student', 'firstName lastName');
    console.log('📥 Fetching appts for tutor:', req.params.tutorID);

    console.log('📤 All tutor appointments:', appointments);
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

  // Parse the date
  const parsedDate = new Date(appointmentDate);
  if (isNaN(parsedDate)) {
    return res.status(400).json({ message: "Invalid appointment date" });
  }

  // Convert ISO time into your enum
  const validTime = convertToValidTime(appointmentTime);
  if (!validTime) {
    return res.status(400).json({ message: "Invalid appointment time" });
  }

  try {
    const newAppt = new Appointment({
      student,
      tutor,
      subject,
      appointmentTime: validTime,
      appointmentDate: parsedDate,
      status: 'scheduled'
    });
    await newAppt.save();
    console.log("✅ Appointment created:", newAppt);
    res.status(201).json(newAppt);
  } catch (err) {
    console.error("❌ Failed to create appointment:", err);
    //res.status(400).json({ message: 'Failed to create appointment' });
    // 1) Duplicate‐key from your unique index on (tutor, appointmentDate, appointmentTime)
  if (err.code === 11000) {
    return res
      .status(409)    // 409 Conflict
      .json({ message: "That tutor is already booked at this date & time." });
  }
  }
};

// PATCH mark appointment as completed and update tutor payroll
export const completeAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.appointmentId);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    if (appt.status === 'completed') {
      return res.status(400).json({ message: 'Appointment already marked complete' });
    }
    appt.status = 'completed';
    await appt.save();
    await updateUnconfirmedHours(appt.tutor);
    res.json({ message: 'Appointment completed successfully' });
  } catch (err) {
    console.error("❌ Failed to complete appointment:", err);
    res.status(500).json({ message: 'Failed to complete appointment' });
  }
};

// GET all completed appointments (admin)
export const getLoggedAppointments = async (req, res) => {
  try {
    const appts = await Appointment.find({ status: 'completed' });
    res.json(appts);
  } catch (err) {
    console.error("❌ Failed to get logged appointments:", err);
    res.status(500).json({ message: 'Failed to get logged appointments' });
  }
};
