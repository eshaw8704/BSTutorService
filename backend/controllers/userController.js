// userController.js

import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Step 1: Check if both fields are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Step 2: Find the user by email
        const user = await User.findOne({ email });

        // Step 3: Check if the user exists
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Step 4: Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // Step 5: Handle incorrect password
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Step 6: If successful, send back user data (without the password)
        return res.status(200).json({ 
            message: "Login successful!",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};
