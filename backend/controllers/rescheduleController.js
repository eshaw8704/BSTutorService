import Appointment from '../models/Appointment.js';
import { sendEmailReceipt } from '../utils/sendEmail.js';

// Convert ISO time into enum format
const convertToValidTime = (isoString) => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const key = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

  const timeMap = {
    '8:00': '08:00 AM',
    '9:30': '09:30 AM',
    '10:00': '10:00 AM',
    '11:30': '11:30 AM',
    '13:00': '01:00 PM',
    '13:30': '01:30 PM',
    '14:00': '02:00 PM',
    '14:30': '02:30 PM',
    '15:00': '03:00 PM'
  };

  return timeMap[key] || null;
};

//export const changeAppointment = async (req, res) => {
  console.log("🔄 Reschedule request:", req.params.appointmentId);
  console.log("📬 Incoming:", req.body);

  try {
    const appointment = await Appointment.findById(req.params.appointmentId).populate('student tutor', 'firstName lastName email');
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update date
    if (req.body.appointmentDate) {
      const parsedDate = new Date(req.body.appointmentDate);
      if (isNaN(parsedDate)) {
        return res.status(400).json({ message: "Invalid appointmentDate" });
      }
      appointment.appointmentDate = parsedDate;
    }

    // Update time using enum
    if (req.body.appointmentTime) {
      const enumTime = convertToValidTime(req.body.appointmentTime);
      if (!enumTime) {
        return res.status(400).json({ message: "Invalid appointmentTime value" });
      }
      appointment.appointmentTime = enumTime;
    }

    await appointment.save();

    // Send email to student
    if (appointment.student?.email) {
      await sendEmailReceipt({
        to: appointment.student.email,
        subject: 'Appointment Rescheduled',
        html: `
          <h2>Hello ${appointment.student.firstName}!</h2>
          <p>Your appointment has been rescheduled:</p>
          <ul>
            <li><strong>Subject:</strong> ${appointment.subject}</li>
            <li><strong>New Date:</strong> ${appointment.appointmentDate.toLocaleDateString()}</li>
            <li><strong>New Time:</strong> ${appointment.appointmentTime}</li>
          </ul>
        `
      });
    }

    // Send email to tutor
    if (appointment.tutor?.email) {
      await sendEmailReceipt({
        to: appointment.tutor.email,
        subject: 'Appointment Rescheduled by Student',
        html: `
          <h2>Hello ${appointment.tutor.firstName}!</h2>
          <p>An appointment has been rescheduled by a student:</p>
          <ul>
            <li><strong>Student:</strong> ${appointment.student.firstName} ${appointment.student.lastName}</li>
            <li><strong>Subject:</strong> ${appointment.subject}</li>
            <li><strong>New Date:</strong> ${appointment.appointmentDate.toLocaleDateString()}</li>
            <li><strong>New Time:</strong> ${appointment.appointmentTime}</li>
          </ul>
        `
      });
    }

    console.log("✅ Appointment updated and emails sent.");
    res.json({ message: "Appointment updated", appointment });
  } catch (err) {
    console.error("❌ Reschedule failed:", err.message, err.stack);
    res.status(500).json({ message: "Error updating appointment" });
  }
//};