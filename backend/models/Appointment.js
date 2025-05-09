import mongoose from "mongoose";

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
      "08:00 AM", "08:30 AM",
      "09:00 AM", "09:30 AM",
      "10:00 AM", "10:30 AM",
      "11:00 AM", "11:30 AM",
      "12:00 PM", "12:30 PM",
      "01:00 PM", "01:30 PM",
      "02:00 PM", "02:30 PM",
      "03:00 PM", "03:30 PM",
      "04:00 PM", "04:30 PM",
      "05:00 PM"
    ]
  },
  appointmentDate: {
    type: Date,
    required: true
  }
});

appointmentSchema.index({ student: 1, tutor: 1 });
appointmentSchema.index(
  { tutor: 1, appointmentDate: 1, appointmentTime: 1 },
  { unique: true }
);

export default mongoose.model("Appointment", appointmentSchema);
