
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/User.model');

const router = express.Router();

// Helper function to generate UserId
const generateUserId = (email, userId) => {
  if (userId) return userId; // Return provided UserId if exists
  return email.split('@')[0]; // Strip the first B/P and 6 digits to assign as UserId
};

// Register
router.post('/register', async (req, res) => {
  const { UserId, Email, Password, Profile, Branch, Department, Branches } = req.body;

  try {
    // Check for existing user
    if (await User.findOne({ Email })) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Generate UserId and AccountType based on email
    const generatedUserId = generateUserId(Email, UserId);
    const AccountType = Email.startsWith('B') ? 'Student' : 'Professor';

    // Hash password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create new user instance
    const user = new User({
      UserId: generatedUserId,
      Email,
      Password: hashedPassword,
      AccountType,
      Profile,
      Branch,
      Department,
      Branches,
    });

    // Save user to the database
    await user.save();

    // Create and send JWT token
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });

  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send('Server error');
  }
});



module.exports = router;

