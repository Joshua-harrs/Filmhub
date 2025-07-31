const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email exists already, no double dip
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: 'Email already registered' });

    // Hash password safely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Create JWT token and send back token + user data
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ 
      token,
      user: { id: newUser._id, email: newUser.email }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send token + user info for frontend use
    res.json({
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
