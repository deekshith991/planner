
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../Models/User.model");
const { log_in } = require("../Utils/Logger.js");

const router = express.Router();

// Login Function
router.post('/login', async (req, res) => {
  let { username, Password } = req.body; // username can be UserId or Email

  // Check if the username is in UserId format and append the email domain
  if (username.length === 7) {
    username += '@rgukt.ac.in'; // Convert UserId to email format
  }

  try {
    // Find user by Email
    const user = await User.findOne({ Email: username });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      UserId: user.UserId,
      AccountType: user.AccountType,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

    log_in(user.UserId);


  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;

