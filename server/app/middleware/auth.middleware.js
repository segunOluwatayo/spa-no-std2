const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    // console.log('Token:', token);

    const decoded = jwt.verify(token, 'your-secret-key');
    // console.log('Decoded:', decoded);

    const user = await User.findOne({ _id: decoded.userId, 'tokens.token': token });
    // console.log('User:', user);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    res.status(401).json({ error: 'Authentication required' });
  }
};
module.exports = authMiddleware;