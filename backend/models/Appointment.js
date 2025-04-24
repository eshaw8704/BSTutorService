import mongoose from "mongoose";

// Define the Appointment schema
const appointmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },
  subject: {
    type: String,
    required: true,
    enum: ["Math", "Science", "English", "History", "Programming"]
  },
  appointmentTime: {
    type: String,
    required: true,
    enum: [
      "08:00 AM", "09:30 AM", "10:00 AM", "11:30 AM",
      "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM"
    ]
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Scheduled", "Cancelled"],
    default: "Scheduled"
  }
});

// Compound index for faster lookups & prevent double-booking
appointmentSchema.index({ student: 1, tutor: 1 });
appointmentSchema.index(
  { tutor: 1, appointmentDate: 1, appointmentTime: 1 },
  { unique: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
