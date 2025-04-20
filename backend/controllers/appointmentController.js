import { Appointment } from '../models/Appointment.js';

// completeAppointment: Marks an appointment as completed for payroll purposes.
export const completeAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    
    // find the appointment by its ID
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }
    
    // prevents marking an already completed appointment
    if (appointment.status === 'Completed') {
      return res.status(400).json({ message: "Appointment is already marked as Completed." });
    }
          
    // update the status to "Completed"
    appointment.status = 'Completed';
    await appointment.save();

    res.status(200).json({ message: "Marked as Completed successfully!", appointment });
  } catch (error) {
    console.error("Error marking appointment as completed:(", error.message);
    res.status(500).json({ message: "Error marking appointment as completed:(", error: error.message });
  }
};

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
export const getAppointmentsByTutor = async (req, res) => {   
  try {
    const { tutorID } = req.params;
    const appts = await Appointment.find({
      tutor: tutorID,
      status: 'Booked'
    })
    .populate('student', 'firstName lastName')  // so you can show student names
    .sort({ appointmentTime: 1 });

    res.status(200).json(appts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch tutor appointments' });
    }
  };
  

// create appointmnt
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

// Endpoint to view all logged (completed) hours for the admin
// This endpoint allows the admin to view all appointments that have been marked as completed.
export const getLoggedAppointments = async (req, res) => {
    try {
      // filtering: the admin can filter by tutor or date range
      const { tutorId, startDate, endDate } = req.query;
      
      // Constructing the criteria for the query
      const criteria = { status: 'Completed' };
      if (tutorId) {
        criteria.tutor = tutorId;
      }

      if (startDate || endDate) {
        criteria.appointmentTime = {};
        if (startDate) {
          criteria.appointmentTime.$gte = new Date(startDate);
        }
        if (endDate) {
          criteria.appointmentTime.$lte = new Date(endDate);
        }
      }
  
      // Fetching appointments based on the criteria
      // Populate the tutor and student fields with their names and emails
      const appointments = await Appointment.find(criteria)
        .populate('tutor', 'firstName lastName email')
        .populate('student', 'firstName lastName email');
  
      // Check if any appointments were found
      res.status(200).json({ appointments });
    } catch (error) {
      console.error("Error fetching logged appointments:", error.message);
      res.status(500).json({ message: "Server error while fetching logged appointments", error: error.message });
    }
  };  
