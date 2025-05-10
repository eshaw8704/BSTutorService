import mongoose from 'mongoose';

// Define the User schema
// This schema defines the structure of the User document in MongoDB
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  role: {
    type: String,
    enum: ['student','tutor','admin'],
    default: 'student'
  },  UID:       { type: String, required: true },
  // New profile fields
  experience:       { type: String, default: '' },
  institution:      { type: String, default: '' },
  biography:        { type: String, default: '' },
  profilePicture:   { type: String, default: '' },
}, {
  timestamps: true
});

// Adding a compound index on 'email' and 'role' for faster lookups
const User = mongoose.model('User', userSchema);

export default User;