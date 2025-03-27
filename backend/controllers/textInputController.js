import { User } from '../models/userModel.js';

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validate inputs
        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ username, email, password, role });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error in createUser:', error.message);
        res.status(500).json({ message: error.message });
    }
};
