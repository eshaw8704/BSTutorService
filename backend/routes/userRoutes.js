import express from 'express';
import User from '../models/User.js'; 

const router = express.Router();

// POST route for user registration
router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    
    // Create a new user. You can add validations or hashing for the password here.
    const newUser = new User({ firstName, lastName, email, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    console.error('Error in userRoutes:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
