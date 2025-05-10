import jwt from 'jsonwebtoken'; // ✅ Required for token verification
import User from '../models/User.js'; // ✅ This is missing

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      console.log("❌ No token provided");
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      console.log("❌ No user found for token");
      return res.status(401).json({ message: 'User not found' });
    }

    next();
  } catch (err) {
    console.error("❌ Auth middleware error:", err.message);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
