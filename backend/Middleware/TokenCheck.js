
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token payload (user info) to the request
    next(); // Call the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = auth;

