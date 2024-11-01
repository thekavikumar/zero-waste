const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to create a new user or update user data if they are new
router.post('/register', async (req, res) => {
  const { phoneNumber, firstName, lastName, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // First-time user
      user = new User({ phoneNumber, firstName, lastName, isNewUser: false });
      await user.save();
      return res.status(201).json({ message: 'User registered', user });
    }

    // Existing user, update additional data
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.isNewUser = false;

    user.isNewUser = false;
    await user.save();
    res.status(200).json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).json({ error: 'Error processing request' });
  }
});

// Route to get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error processing request' });
  }
});

// Route to get a single user by email
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error processing request' });
  }
});

module.exports = router;
