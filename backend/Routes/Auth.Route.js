const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/Users.Model'); // Import your User model
const { authenticateToken } = require('../Middleware/jwtAuth');

const router = express.Router();

// Register Route
// router.post('/register', async (req, res) => {
//   try {
//     const { email, password, accountType, batchYear, joiningYear, branch, branches } = req.body;
//
//     // Check if the email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }
//
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//
//     // Create new user data
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       accountType,
//       batchYear: accountType === 'student' ? batchYear : undefined,
//       joiningYear: accountType === 'professor' ? joiningYear : undefined,
//       branch: accountType === 'student' ? branch : undefined,
//       Branches: accountType === 'professor' ? branches : undefined
//     });
//
//     // Save the new user (triggers pre-save middleware to generate userId)
//     await newUser.save();
//
//     return res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error', error });
//   }
// });

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { UserId, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ UserId });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // // Check if the password matches
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid email or password' });
    // }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.userId,
        email: user.email,
        accountType: user.accountType
      },
      process.env.JWT_SECRET || 'secretKey', // Use environment variable
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Protected Route Example
router.get('/protected-route', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'You have access to this route' });
});

module.exports = router;

