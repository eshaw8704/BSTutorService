// controllers/userController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// This function generates a JWT token for the user
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    const token = generateToken(newUser._id);

    res.status(201).json({
      message: 'User created',
      user: {
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role
      },
      token
    });
  } catch (err) {
    console.error('❌ Registration failed:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// This function handles user registration
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Build safe response
    const userData = {
      _id: user._id,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ message: 'Login successful', user: userData });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// GET /api/users/profile
// Returns the logged-in user (no password)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('getProfile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/users/profile
// Update current user’s profile
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Only these fields are updatable
  user.firstName      = req.body.firstName      ?? user.firstName;
  user.lastName       = req.body.lastName       ?? user.lastName;
  user.experience     = req.body.experience     ?? user.experience;
  user.institution    = req.body.institution    ?? user.institution;
  user.biography      = req.body.biography      ?? user.biography;
  user.profilePicture = req.body.profilePicture ?? user.profilePicture;

  const updated = await user.save();

  res.json({
    _id:            updated._id,
    firstName:      updated.firstName,
    lastName:       updated.lastName,
    email:          updated.email,
    role:           updated.role,
    experience:     updated.experience,
    institution:    updated.institution,
    biography:      updated.biography,
    profilePicture: updated.profilePicture,
  });
});
