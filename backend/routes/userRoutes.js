import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// 🔐 Generate a token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// ✅ Register route: /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const UID = crypto.randomUUID();

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      UID,
    });

    await newUser.save();

    const { password: _, ...userData } = newUser.toObject(); // remove hashed password
    const token = generateToken(newUser._id);

    res.status(201).json({
      message: 'User created successfully!',
      user: userData,
      token
    });

  } catch (error) {
    console.error('Error in registration:', error.message);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// ✅ Login route: /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful!',
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        UID: user.UID,
        firstName: user.firstName,
        lastName: user.lastName
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// ✅ Get all tutors (optional)
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
