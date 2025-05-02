import { Appointment } from '../models/Appointment.js';

export const changeAppointment = async (req, res) => {
    try {
        const { appointmentTime } = req.body;
        const appointmentId = req.params.appointmentId;


        // Check if the appointment time is within the tutor's working hours (9 AM to 5 PM)
        const appointmentHour = new Date(appointmentTime).getHours();
        if (appointmentHour < 9 || appointmentHour >= 17) {
            return res.status(400).json({ message: "The tutor is only available from 9 AM to 5 PM." });
        }

        // Find the appointment by ID
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        // Check if the tutor is available at the new appointment time
        const tutorAppointments = await Appointment.find({ tutor: appointment.tutor });
        const isTimeAvailable = !tutorAppointments.some(app => app.appointmentTime === appointmentTime);

        if (!isTimeAvailable) {
            return res.status(400).json({ message: "The tutor is already booked at this time." });
        }

        // Update the appointment with the new time
        appointment.appointmentTime = appointmentTime;
        await appointment.save();

        res.status(200).json({ message: "Appointment successfully rescheduled.", appointment });
    } catch (error) {
        res.status(500).json({ message: "Error rescheduling appointment.", error: error.message });
    }
};
