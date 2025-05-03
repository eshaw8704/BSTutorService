// backend/middleware/auth.js
import jwt from 'jsonwebtoken';
/*import User from '../models/User.js'; // if you want to fetch user data

/**
 * Protect routes by verifying JWT and attaching req.user.id
 */
/*export const protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  const token = auth.split(' ')[1];
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user ID for downstream controllers
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ message: 'Not authorized, token invalid' });*/
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error('Auth error:', error);
      res.status(401).json({ message: 'Token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
