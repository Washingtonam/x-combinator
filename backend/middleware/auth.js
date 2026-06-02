const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authCheck = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-passwordHash');
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  if (req.user.role === 'admin' || req.user.role === 'super_admin') return next();
  return res.status(403).json({ error: 'Forbidden: admin only' });
};

const isSuperAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  if (req.user.role === 'super_admin') return next();
  return res.status(403).json({ error: 'Forbidden: super admin only' });
};

module.exports = { authCheck, isAdmin, isSuperAdmin };
