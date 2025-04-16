import { Appointment } from '../models/Appointment.js';
import nodemailer from 'nodemailer';

// GET appointments for a specific student
export const getAppointmentByStudent = async (req, res) => {
  try {
    const { studentID } = req.params;
    const appointments = await Appointment.find({ student: studentID });

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this student." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving appointments", error: error.message });
  }
};

// CREATE a new appointment
export const createAppointment = async (req, res) => {
  try {
    const { subject, appointmentTime, appointmentDate, tutor, email } = req.body;

    if (!email || !subject || !appointmentTime || !appointmentDate || !tutor) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newAppointment = new Appointment({
      subject,
      appointmentTime,
      appointmentDate,
      tutor,
    });

    await newAppointment.save();

    // Send email confirmation
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Appointment Confirmation',
      text: `Your appointment for ${subject} on ${appointmentDate} at ${appointmentTime} has been booked successfully.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
  } catch (error) {
    console.error("Error booking appointment:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: "Error booking appointment", error: error.message });
  }
};
