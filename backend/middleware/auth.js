// backend/middleware/auth.js
/**
 * Dummy protect middleware.
 * In production, verify a JWT (e.g. with jsonwebtoken) and set req.user.id.
 */
export const protect = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  
    // TODO: replace this stub with real token verification
    // const token = auth.split(' ')[1];
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = { id: decoded.id };
  
    // For now, just set a placeholder user ID so your /upcoming route works
    req.user = { id: req.headers['x-stub-user-id'] || '000000000000000000000000' };
    next();
  };
  