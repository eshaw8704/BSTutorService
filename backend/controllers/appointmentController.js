import { Appointment } from '../models/Appointment.js';
import { sendEmail } from '../utils/email.js';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

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

        try {
            await sendEmail(
                email,
                'Appointment Confirmation',
                `Your appointment for ${subject} on ${appointmentDate} at ${appointmentTime} has been booked successfully.`
            );
        } catch (emailError) {
            console.error("Error sending confirmation email:", emailError.message);
        }

        res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
    } 
    catch (error) {
        console.error("Error booking appointment:", {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({ message: "Error booking appointment", error: error.message });
    }
};