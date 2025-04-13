import { Appointment } from '../models/Appointment.js';
//main
import nodemailer from 'nodemailer';
//
//import { sendEmail } from '../utils/email.js';
//import dotenv from 'dotenv';

//dotenv.config();

//const EMAIL_USER = process.env.EMAIL_USER;
//const EMAIL_PASS = process.env.EMAIL_PASS;
//liz

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
//main
        const { subject, appointmentTime, tutor } = req.body;

        if (!subject || !appointmentTime || !appointmentDate || !tutor) {
//
        const { subject, appointmentTime, appointmentDate, tutor, email } = req.body;

        if (!email || !subject || !appointmentTime || !appointmentDate || !tutor) {
//liz
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

//main
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });
/*
        try {
            await sendEmail(
                email,
                'Appointment Confirmation',
                `Your appointment for ${subject} on ${appointmentDate} at ${appointmentTime} has been booked successfully.`
            );
        } catch (emailError) {
            console.error("Error sending confirmation email:", emailError.message);
        }

*/
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