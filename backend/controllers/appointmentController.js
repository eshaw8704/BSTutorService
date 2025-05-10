// backend/controllers/appointmentController.js

import Appointment from '../models/Appointment.js';
import { updateUnconfirmedHours } from '../utils/payrollUtils.js';
import { sendEmailReceipt } from '../utils/sendEmail.js';

const convertToValidTime = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const key = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  const timeMap = {
    '8:00':  '08:00 AM', '8:30':  '08:30 AM',
    '9:00':  '09:00 AM', '9:30':  '09:30 AM',
    '10:00': '10:00 AM', '10:30': '10:30 AM',
    '11:00': '11:00 AM', '11:30': '11:30 AM',
    '12:00': '12:00 PM', '12:30': '12:30 PM',
    '13:00': '01:00 PM', '13:30': '01:30 PM',
    '14:00': '02:00 PM', '14:30': '02:30 PM',
    '15:00': '03:00 PM', '15:30': '03:30 PM',
    '16:00': '04:00 PM', '16:30': '04:30 PM',
    '17:00': '05:00 PM'
  };

  return timeMap[key] || null;
};

const getUpcomingForStudent = async (req, res) => {
  try {
    const studentId = req.user.id;
    const now = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(now.getDate() + 30);

    const upcoming = await Appointment.find({
      student: studentId,
      appointmentDate: { $gte: now, $lte: nextMonth }
    })
    .populate('tutor', 'firstName lastName')
    .sort('appointmentDate');

    res.json(upcoming);
  } catch (err) {
    console.error('❌ Error fetching upcoming appointments:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAppointmentByStudent = async (req, res) => {
  try {
    const appointments = await Appointment.find({ student: req.params.studentID });
    res.json(appointments);
  } catch (err) {
    console.error("❌ Error fetching appointments by student:", err);
    res.status(500).json({ message: 'Error fetching appointments by student' });
  }
};

const getAppointmentsByTutor = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      tutor: req.params.tutorID
    }).populate('student', 'firstName lastName');

    res.json(appointments);
  } catch (err) {
    console.error("❌ Error fetching appointments by tutor:", err);
    res.status(500).json({ message: 'Error fetching appointments by tutor' });
  }
};

const createAppointment = async (req, res) => {
  const { student, tutor, subject, appointmentTime, appointmentDate } = req.body;

  if (!student || !tutor || !subject || !appointmentTime || !appointmentDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const parsedDate = new Date(appointmentDate);
  if (isNaN(parsedDate)) {
    return res.status(400).json({ message: "Invalid appointment date" });
  }

  try {
    const newAppt = new Appointment({
      student,
      tutor,
      subject,
      appointmentTime,
      appointmentDate: parsedDate,
      status: 'scheduled'
    });

    await newAppt.populate('student tutor', 'email firstName lastName');
    await newAppt.save();

    if (newAppt.student?.email) {
      await sendEmailReceipt({
        to: newAppt.student.email,
        subject: 'Appointment Confirmation',
        html: `
          <h2>Hi ${newAppt.student.firstName}!</h2>
          <p>Your appointment has been booked.</p>
          <ul>
            <li><strong>Subject:</strong> ${newAppt.subject}</li>
            <li><strong>Date:</strong> ${newAppt.appointmentDate.toLocaleDateString()}</li>
            <li><strong>Time:</strong> ${newAppt.appointmentTime}</li>
          </ul>
        `
      });
    }

    if (newAppt.tutor?.email) {
      await sendEmailReceipt({
        to: newAppt.tutor.email,
        subject: 'New Appointment Scheduled',
        html: `
          <h2>Hi ${newAppt.tutor.firstName}!</h2>
          <p>A student has scheduled an appointment with you.</p>
          <ul>
            <li><strong>Subject:</strong> ${newAppt.subject}</li>
            <li><strong>Date:</strong> ${newAppt.appointmentDate.toLocaleDateString()}</li>
            <li><strong>Time:</strong> ${newAppt.appointmentTime}</li>
          </ul>
        `
      });
    }

    res.status(201).json(newAppt);

  } catch (err) {
    console.error("❌ Failed to create appointment:", err);
    res.status(500).json({ message: 'Server error creating appointment', error: err.message });
  }
};

const completeAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.appointmentId);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });

    const now = new Date();
    if (now < new Date(appt.appointmentDate)) {
      return res.status(400).json({ message: 'Too early to complete this session' });
    }

    if (appt.status === 'completed') {
      return res.status(400).json({ message: 'Appointment already marked complete' });
    }

    appt.status = 'completed';
    await appt.save();
    await updateUnconfirmedHours(appt.tutor);

    res.json(appt);
  } catch (err) {
    console.error('❌ Failed to complete appointment:', err);
    res.status(500).json({ message: 'Failed to complete appointment' });
  }
};

const getLoggedAppointments = async (req, res) => {
  try {
    const appts = await Appointment.find({ status: 'completed' });
    res.json(appts);
  } catch (err) {
    console.error("❌ Failed to get logged appointments:", err);
    res.status(500).json({ message: 'Failed to get logged appointments' });
  }
};

const changeAppointment = async (req, res) => {
  try {
    const { appointmentDate, appointmentTime } = req.body;
    const appointmentId = req.params.appointmentId;

    const parsedDate = new Date(appointmentDate);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: "Invalid appointment date." });
    }

    const enumTime = appointmentTime.trim(); // ✅ use directly from dropdown

    const appointment = await Appointment.findById(appointmentId).populate('student tutor', 'email firstName lastName');
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    const conflict = await Appointment.findOne({
      tutor: appointment.tutor._id,
      appointmentDate: parsedDate,
      appointmentTime: enumTime,
      _id: { $ne: appointment._id }
    });

    if (conflict) {
      return res.status(400).json({ message: "The tutor is already booked at this date and time." });
    }

    appointment.appointmentDate = parsedDate;
    appointment.appointmentTime = enumTime;
    await appointment.save();

    res.status(200).json({ message: "Appointment successfully rescheduled.", appointment });
  } catch (error) {
    console.error("❌ Reschedule failed:", error);
    res.status(500).json({ message: "Error rescheduling appointment.", error: error.message });
  }
};


const updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { appointmentDate, appointmentTime, subject } = req.body;

    const appointment = await Appointment.findById(appointmentId).populate('student tutor', 'email firstName lastName');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    if (appointmentDate) appointment.appointmentDate = new Date(appointmentDate);
    if (appointmentTime) appointment.appointmentTime = appointmentTime;
    if (subject) appointment.subject = subject;

    await appointment.save();
    res.json({ message: 'Appointment updated and notifications sent.' });
  } catch (err) {
    console.error('❌ Failed to update appointment:', err);
    res.status(500).json({ message: 'Server error updating appointment' });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId).populate('student tutor', 'email firstName lastName');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    await appointment.deleteOne();
    res.json({ message: 'Appointment canceled and notifications sent.' });
  } catch (err) {
    console.error('❌ Failed to cancel appointment:', err);
    res.status(500).json({ message: 'Server error canceling appointment' });
  }
};

const getBookedTimesByTutor = async (req, res) => {
  try {
    const { tutorID } = req.params;
    const { date, exclude } = req.query;

    if (!tutorID || !date) {
      return res.status(400).json({ message: "Missing tutor ID or date" });
    }

    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    targetDate.setHours(0, 0, 0, 0); // normalize start of day
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const query = {
      tutor: tutorID,
      appointmentDate: { $gte: targetDate, $lt: nextDay },
      status: { $in: ['scheduled', 'confirmed'] }
    };

    if (exclude) {
      query._id = { $ne: exclude };
    }

    const appointments = await Appointment.find(query).select('appointmentTime');
    const bookedTimes = appointments.map(appt => appt.appointmentTime);
    res.json(bookedTimes);
  } catch (err) {
    console.error('❌ Failed to fetch booked times:', err);
    res.status(500).json({ message: 'Failed to fetch booked times' });
  }
};


// ✅ Unified export at bottom
export {
  convertToValidTime,
  getUpcomingForStudent,
  getAppointmentByStudent,
  getAppointmentsByTutor,
  createAppointment,
  completeAppointment,
  getLoggedAppointments,
  changeAppointment,
  updateAppointment,
  deleteAppointment,
  getBookedTimesByTutor
};
