import { Appointment } from '../models/Appointment.js';

export const getAppointmentByStudent = async (req, res) => {
    try {
        const { studentID } = req.params;
        const appointments = await Appointment.find({ student: studentID });

        // Check if appointments are found
        if (!appointments || appointments.length == 0) {
            return res.status(404).json({ message: "No appointments found for this student." });
        }

        res.status(201).json(appointments);
    } catch(error) {
        console.error("Error booking appointment:", error.message);
        res.status(500).json({ message: "Error booking appointment", error: error.message });
    }
};