import { Appointment } from '../models/Appointment.js';

export const deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        // Find the appointment by ID
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        // Delete the appointment
        await Appointment.findByIdAndDelete(appointmentId);


        res.status(200).json({ message: "Appointment successfully cancelled." });
    } catch (error) {
        res.status(500).json({ message: "Error cancelling appointment.", error: error.message });
    }
};
