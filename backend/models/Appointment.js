import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true, 
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true, 
    },
    subject: {
        type: String,
        required: true,
        enum: ['Math', 'Science', 'English', 'History', 'Programming'], 
    },
    appointmentTime: {
        type: Date,
        required: true,
    }
});

// Adding a compound index on 'student' and 'tutor' for faster lookups
appointmentSchema.index({ student: 1, tutor: 1 });

export const Appointment = mongoose.model("Appointment", appointmentSchema);