import { Appointment } from '../models/Appointment.js';

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
        const { studentID, subject, appointmentTime, appointmentDay, tutor } = req.body;

        if (!studentID || !subject || !appointmentTime || !appointmentDay || !tutor) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newAppointment = new Appointment({
            student: studentID,
            subject,
            appointmentTime,
            appointmentDay,
            tutor,
        });
        await newAppointment.save();

        res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
    } 
    catch (error) {
        console.error("Error booking appointment:", error.message);
        res.status(500).json({ message: "Error booking appointment", error: error.message });
    }
};