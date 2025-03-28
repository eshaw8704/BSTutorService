import { Appointment } from '../models/Appointment.js';

export const getAppointmentByStudent = async (req, res) => {
    try {
        const { studentID } = req.params;
        const appointments = await Appointment.find({ student: studentID });

        
        if (!studentID || !subject || !appointmentTime || !appointmentDay || !tutor) {
            return res.status(400).json({ message: "All fields are required." });
        }

        res.status(200).json(appointments);
    } catch(error) {
        res.status(500).json({ message: "Error retrieving appointments", error: error.message });
    }
};