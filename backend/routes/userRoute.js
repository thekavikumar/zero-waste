const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to create a new user or update user data if they are new
router.post('/register', async (req, res) => {
  const { phoneNumber, firstName, lastName, email } = req.body;
  console.log(req.body);
  try {
    console.log('registering user...');
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      // First-time user
      console.log('New user');
      user = new User({
        phoneNumber,
        firstName,
        email,
        lastName,
        isNewUser: false,
      });
      console.log(user);
      try {
        await user.save();
        console.log('User saved successfully');
      } catch (error) {
        console.error('Error saving user:', error);
        return;
      }
      console.log('User registered');
      return res.status(201).json({ message: 'User registered', user });
    }

    // Existing user, update additional data
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.isNewUser = false;

    await user.save();
    res.status(201).json({ message: 'User updated', user });
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
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error processing request' });
  }
});

module.exports = router;
