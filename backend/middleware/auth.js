import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  // 1) Stub mode: if the header is explicitly set, use that
  const stubId = req.headers['x-stub-user-id'];
  if (stubId) {
    req.user = { id: stubId };
    return next();
  }

  // 2) Real JWT mode:
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized: no token' });
  }

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ message: 'Not authorized: invalid token' });
  }
};
