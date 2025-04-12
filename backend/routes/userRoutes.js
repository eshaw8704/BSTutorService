import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'; // ✅ import this
import User from '../models/User.js';

const router = express.Router();

// ✅ User Registration Route
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Generate UID
    const UID = crypto.randomUUID();

    // ✅ Create and save the user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      UID, 
    });
    await newUser.save();

    // Remove password from response
    const { password: _, ...userData } = newUser.toObject();
    res.status(201).json({ message: 'User created successfully!', user: userData });

  } catch (error) {
    console.error('Error in registration:', error.message);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ message: 'Invalid password.' });
    }

    const { password: _, ...userData } = user.toObject();

    // ✅ Send role directly in top-level response for frontend routing
    res.status(200).json({
      message: 'Login successful!',
      role: user.role,          // <-- This is key!
      email: user.email,        // optional
      UID: user.UID,            // optional
    });

  } catch (error) {
    console.error('❌ Error during login:', error.message);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// ✅ Route to get all tutors
router.get('/tutors', async (req, res) => {
  try {
    const tutors = await User.find({ role: 'tutor' }).select('-password');
    res.json(tutors);
  } catch (err) {
    console.error("Error fetching tutors:", err);
    res.status(500).json({ message: "Failed to fetch tutors." });
  }
});


export default router;
