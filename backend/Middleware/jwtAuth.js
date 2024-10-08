const jwt = require('jsonwebtoken');

// Token Verification Middleware
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey'); // Use environment variable
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticateToken };

