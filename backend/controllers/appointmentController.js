import Appointment from "../models/Appointment.js";

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

        res.status(201).json({ message: "Appointment booked successfully!", appointment: newAppointment });
    } 
    catch (error) {
        console.error("Error booking appointment:", error.message);
        res.status(500).json({ message: "Error booking appointment", error: error.message });
    }
};