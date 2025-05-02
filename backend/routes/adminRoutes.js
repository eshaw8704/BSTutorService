import express from 'express';
import User from '../models/User.js';
import { getLoggedAppointments } from '../controllers/appointmentController.js';

const router = express.Router();

// 🔹 View all completed appointments
router.get('/logged-appointments', getLoggedAppointments);

// 🔹 Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'firstName lastName email role');
    res.json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// 🔹 Update a user
router.put('/users/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, role },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated', user });
  } catch (err) {
    console.error('❌ Failed to update user:', err);
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// 🔹 Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('❌ Failed to delete user:', err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

export default router;
