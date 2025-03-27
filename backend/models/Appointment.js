import mongoose from "mongoose";
import { User } from './models/userModel';

const appointmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    subject: {
        type: String,
        required: true,
    },

    appointmentTime: {
        type: Date,
        required: true,
    }
});
export const Appointment = mongoose.model("Appointment", appointmentSchema);