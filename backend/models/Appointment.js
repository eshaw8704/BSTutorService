import mongoose from "mongoose";
import { User } from './userModel';

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
        enum: ['Math', 'Science', 'English', 'History', 'Programming'] 
    },
    appointmentTime: {
        type: String,
        required: true,
        enum: ["08:00 AM", "09:30 AM", "10:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM"]
    },
    appointmentDate: {
        type: Date,
        required: true,
    }
});

// Adding a compound index on 'student' and 'tutor' for faster lookups
appointmentSchema.index({ student: 1, tutor: 1 });

export const Appointment = mongoose.model("Appointment", appointmentSchema);