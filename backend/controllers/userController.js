import { User } from "../models/userModel.js";

export const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const newUser = await User.create({ username, email, password, role });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};
