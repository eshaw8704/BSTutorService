// controllers/userController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Step 1: Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 2: Compare password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Step 3: Remove sensitive data and send response
    const { password: _, ...userData } = user.toObject();
    res.status(200).json({ message: 'Login successful', user: userData });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
