import { Appointment } from '../models/Appointment.js';
import nodemailer from 'nodemailer';

// Get appointments for a specific student
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

export const createAppointment = async (req, res) => {
    try {
        const { subject, appointmentTime, tutor } = req.body;

        if (!subject || !appointmentTime || !appointmentDate || !tutor) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newAppointment = new Appointment({
            subject,
            appointmentTime,
            appointmentDate,
            tutor,
        });
        await newAppointment.save();
        //email notification
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service provider
            auth: {
                user: 'your-email@gmail.com', // Replace with your email
                pass: 'your-email-password', // Replace with your email password or app password
            },
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Appointment Confirmation',
            text: `Your appointment for ${subject} on ${appointmentDay} at ${appointmentTime} has been booked successfully.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });
        res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
    } 
    catch (error) {
        console.error("Error booking appointment:", error.message);
        res.status(500).json({ message: "Error booking appointment", error: error.message });
    }
};