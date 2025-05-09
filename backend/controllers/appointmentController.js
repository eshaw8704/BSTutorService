import Appointment from '../models/Appointment.js';
import { updateUnconfirmedHours } from '../utils/payrollUtils.js';
import { sendEmailReceipt } from '../utils/sendEmail.js';

const convertToValidTime = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const key = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  const timeMap = {
    '8:00': '08:00 AM', '9:00': '09:00 AM', '9:30': '09:30 AM',
    '10:00': '10:00 AM', '11:00': '11:00 AM', '11:30': '11:30 AM',
    '12:00': '12:00 PM', '13:00': '01:00 PM', '13:30': '01:30 PM',
    '14:00': '02:00 PM', '14:30': '02:30 PM', '15:00': '03:00 PM',
    '16:00': '04:00 PM', '17:00': '05:00 PM'
  };

  return timeMap[key] || null;
};

export const getUpcomingForStudent = async (req, res) => {
  try {
    const studentId = req.user.id;
    const now = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(now.getDate() + 30);

    const upcoming = await Appointment.find({
      student: studentId,
      appointmentDate: { $gte: now, $lte: nextMonth }
    }).populate('tutor', 'firstName lastName').sort('appointmentDate');

    res.json(upcoming);
  } catch (err) {
    console.error('❌ Error fetching upcoming appointments:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { tutor, subject, appointmentTime, appointmentDate } = req.body;
    const student = req.user._id;

    const missing = [];
    if (!student) missing.push('student');
    if (!tutor) missing.push('tutor');
    if (!subject) missing.push('subject');
    if (!appointmentTime) missing.push('appointmentTime');
    if (!appointmentDate) missing.push('appointmentDate');

    if (missing.length > 0) {
      return res.status(400).json({
        message: `Missing required field${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`
      });
    }

    const parsedDate = new Date(appointmentDate);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: "Invalid appointment date format" });
    }

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
    return res.status(500).json({ message: 'Server error creating appointment' });
  }
};

export const completeAppointment = async (req, res) => {
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

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId).populate('student tutor', 'email firstName lastName');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    await appointment.deleteOne();

    const emailContent = `
      <p>The following appointment has been canceled:</p>
      <ul>
        <li><strong>Date:</strong> ${appointment.appointmentDate.toLocaleDateString()}</li>
        <li><strong>Time:</strong> ${appointment.appointmentTime}</li>
        <li><strong>Subject:</strong> ${appointment.subject}</li>
      </ul>
    `;

    if (appointment.student?.email) {
      await sendEmailReceipt({
        to: appointment.student.email,
        subject: 'Appointment Cancellation Notification',
        html: `<h2>Hi ${appointment.student.firstName}!</h2>${emailContent}`
      });
    }

    if (appointment.tutor?.email) {
      await sendEmailReceipt({
        to: appointment.tutor.email,
        subject: 'Appointment Cancellation Notification',
        html: `<h2>Hi ${appointment.tutor.firstName}!</h2>${emailContent}`
      });
    }

    res.json({ message: 'Appointment canceled and notifications sent.' });
  } catch (err) {
    console.error('❌ Failed to cancel appointment:', err);
    res.status(500).json({ message: 'Server error canceling appointment' });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { appointmentDate, appointmentTime, subject } = req.body;

    const appointment = await Appointment.findById(appointmentId).populate('student tutor', 'email firstName lastName');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    if (appointmentDate) appointment.appointmentDate = new Date(appointmentDate);
    if (appointmentTime) appointment.appointmentTime = appointmentTime;
    if (subject) appointment.subject = subject;
    await appointment.save();

    res.json({ message: 'Appointment updated' });
  } catch (err) {
    console.error('❌ Failed to update appointment:', err);
    res.status(500).json({ message: 'Server error updating appointment' });
  }
};

export const changeAppointment = async (req, res) => {
  try {
    const { appointmentTime } = req.body;
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    const existing = await Appointment.findOne({
      tutor: appointment.tutor,
      appointmentDate: appointment.appointmentDate,
      appointmentTime,
      _id: { $ne: appointmentId }
    });

    if (existing) {
      return res.status(409).json({ message: "Tutor already booked at this time" });
    }

    appointment.appointmentTime = appointmentTime;
    await appointment.save();

    res.status(200).json({ message: "Appointment time updated", appointment });
  } catch (err) {
    console.error('❌ Error in changeAppointment:', err);
    res.status(500).json({ message: 'Server error while updating appointment time' });
  }
};

export const getAppointmentByStudent = async (req, res) => {
  try {
    const appointments = await Appointment.find({ student: req.params.studentID });
    res.json(appointments);
  } catch (err) {
    console.error("❌ Error fetching appointments by student:", err);
    res.status(500).json({ message: 'Error fetching appointments by student' });
  }
};

export const getAppointmentsByTutor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ tutor: req.params.tutorID }).populate('student', 'firstName lastName');
    res.json(appointments);
  } catch (err) {
    console.error("❌ Error fetching appointments by tutor:", err);
    res.status(500).json({ message: 'Error fetching appointments by tutor' });
  }
};

export const getLoggedAppointments = async (req, res) => {
  try {
    const appts = await Appointment.find({ status: 'completed' });
    res.json(appts);
  } catch (err) {
    console.error("❌ Failed to get logged appointments:", err);
    res.status(500).json({ message: 'Failed to get logged appointments' });
  }
};
