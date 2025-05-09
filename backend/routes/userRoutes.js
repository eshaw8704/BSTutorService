import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Payroll from '../models/payroll.js';
import { protect } from '../middleware/auth.js';
import {
  getProfile,
  updateProfile,
  updateEmail,
  updatePassword,
  deleteUser
} from '../controllers/userController.js';

dotenv.config();

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 🔹 Register
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, secretKey } = req.body;

    if (role === 'admin' && secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: 'Invalid admin secret key.' });
    }

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
      UID
    });

    await newUser.save();

    if (role === 'tutor') {
      await Payroll.create({
        tutor: newUser._id,
        confirmedHours: 0,
        unconfirmedHours: 0,
        earnings: 0,
        confirmed: false
      });
    }

    const token = generateToken(newUser._id);

    res.status(201).json({
      message: 'User created successfully!',
      user: {
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        UID: newUser.UID,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      },
      token
    });
  } catch (error) {
    console.error('Error in registration:', error.message);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// 🔹 Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid password.' });

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

// 🔹 Get all tutors
router.get('/tutors', async (req, res) => {
  try {
    const tutors = await User.find({ role: 'tutor' }).select('-password');
    console.log("👨‍🏫 Tutors found:", tutors.length);
    res.json(tutors);
  } catch (err) {
    console.error("Error fetching tutors:", err);
    res.status(500).json({ message: "Failed to fetch tutors." });
  }
});

// 🔹 User profile
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/email', protect, updateEmail);
router.put('/password', protect, updatePassword);
router.delete('/profile', protect, deleteUser);

export default router;
