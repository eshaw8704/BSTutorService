import Appointment from '../models/Appointment.js';
import { updateUnconfirmedHours } from '../utils/payrollUtils.js';
import { sendEmailReceipt } from '../utils/sendEmail.js';

const convertToValidTime = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const key = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  const timeMap = {
    '8:00': '08:00 AM',
    '9:30': '09:30 AM',
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

  const parsedDate = new Date(appointmentDate);
  if (isNaN(parsedDate)) {
    return res.status(400).json({ message: "Invalid appointment date" });
  }

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

    // ✅ Populate email + name fields for both student and tutor
    await newAppt.populate('student tutor', 'email firstName lastName');
    await newAppt.save();

    // ✅ Send confirmation email to student
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
          <p>Thank you for choosing BSTutor.</p>
        `
      });
    }

    // ✅ Send confirmation email to tutor
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
          <p>Check your tutor dashboard for more info.</p>
        `
      });
    }

    res.status(201).json(newAppt);

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "That tutor is already booked at this date & time." });
    }
    console.error("❌ Failed to create appointment:", err);
    res.status(500).json({ message: 'Server error creating appointment' });
  }
};

export const completeAppointment = async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.appointmentId);
    if (!appt) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // 1) Too early?
    const now = new Date();
    if (now < new Date(appt.appointmentDate)) {
      return res.status(400).json({
        message: 'Too early to complete this session'
      });
    }

    // 2) Already done?
    if (appt.status === 'completed') {
      return res.status(400).json({
        message: 'Appointment already marked complete'
      });
    }

    // 3) Mark complete & update payroll
    appt.status = 'completed';
    await appt.save();
    await updateUnconfirmedHours(appt.tutor);

    // 4) Return the updated appointment so front-end can confirm success
    res.json(appt);

  } catch (err) {
    console.error('❌ Failed to complete appointment:', err);
    res.status(500).json({ message: 'Failed to complete appointment' });
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
export const changeAppointment = async (req, res) => {
  try {
    const { appointmentDate, appointmentTime } = req.body;
    const appointmentId = req.params.appointmentId;

    const parsedDate = new Date(appointmentDate);
    if (isNaN(parsedDate)) {
      return res.status(400).json({ message: "Invalid appointment date." });
    }

    const enumTime = convertToValidTime(appointmentTime);
    if (!enumTime) {
      return res.status(400).json({ message: "Invalid appointment time." });
    }

    const hour = new Date(appointmentTime).getHours();
    if (hour < 9 || hour >= 17) {
      return res.status(400).json({ message: "The tutor is only available from 9 AM to 5 PM." });
    }

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

    if (appointment.student?.email) {
      await sendEmailReceipt({
        to: appointment.student.email,
        subject: 'Appointment Rescheduled',
        html: `
          <h2>Hello ${appointment.student.firstName}!</h2>
          <p>Your appointment has been rescheduled:</p>
          <ul>
            <li><strong>Subject:</strong> ${appointment.subject}</li>
            <li><strong>New Date:</strong> ${parsedDate.toLocaleDateString()}</li>
            <li><strong>New Time:</strong> ${enumTime}</li>
          </ul>
        `
      });
    }

    if (appointment.tutor?.email) {
      await sendEmailReceipt({
        to: appointment.tutor.email,
        subject: 'Appointment Rescheduled by Student',
        html: `
          <h2>Hello ${appointment.tutor.firstName}!</h2>
          <p>An appointment has been rescheduled by a student:</p>
          <ul>
            <li><strong>Student:</strong> ${appointment.student.firstName} ${appointment.student.lastName}</li>
            <li><strong>Subject:</strong> ${appointment.subject}</li>
            <li><strong>New Date:</strong> ${parsedDate.toLocaleDateString()}</li>
            <li><strong>New Time:</strong> ${enumTime}</li>
          </ul>
        `
      });
    }

    res.status(200).json({ message: "Appointment successfully rescheduled.", appointment });
  } catch (error) {
    console.error("❌ Reschedule failed:", error);
    res.status(500).json({ message: "Error rescheduling appointment.", error: error.message });
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

    // Send update emails
    if (appointment.student?.email) {
      await sendEmailReceipt({
        to: appointment.student.email,
        subject: 'Appointment Update Notification',
        html: `
          <h2>Hi ${appointment.student.firstName}!</h2>
          <p>Your appointment has been updated.</p>
          <ul>
            <li><strong>New Date:</strong> ${appointment.appointmentDate.toLocaleDateString()}</li>
            <li><strong>New Time:</strong> ${appointment.appointmentTime}</li>
            <li><strong>Subject:</strong> ${appointment.subject}</li>
          </ul>
          <p>Please check your dashboard for details.</p>
        `
      });
    }

    if (appointment.tutor?.email) {
      await sendEmailReceipt({
        to: appointment.tutor.email,
        subject: 'Appointment Update Notification',
        html: `
          <h2>Hi ${appointment.tutor.firstName}!</h2>
          <p>Your appointment with a student has been updated.</p>
          <ul>
            <li><strong>New Date:</strong> ${appointment.appointmentDate.toLocaleDateString()}</li>
            <li><strong>New Time:</strong> ${appointment.appointmentTime}</li>
            <li><strong>Subject:</strong> ${appointment.subject}</li>
          </ul>
          <p>Please check your dashboard for details.</p>
        `
      });
    }

    console.log('✅ Emails sent after appointment update.');
    res.json({ message: 'Appointment updated and notifications sent.' });
  } catch (err) {
    console.error('❌ Failed to update appointment:', err);
    res.status(500).json({ message: 'Server error updating appointment' });
  }
};

// DELETE appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId).populate('student tutor', 'email firstName lastName');

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

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

    console.log('✅ Cancellation emails sent to student and tutor.');
    res.json({ message: 'Appointment canceled and notifications sent.' });

  } catch (err) {
    console.error('❌ Failed to cancel appointment:', err);
    res.status(500).json({ message: 'Server error canceling appointment' });
  }
};