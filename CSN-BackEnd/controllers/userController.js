const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password,address,contactNumber, role = 'user' } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    newuser = new User({ name, email, password:hashedPassword,address,contactNumber, role });

    await newuser.save();

    res.status(201).json({ msg: 'User registered successfully', user: newuser });
    const payload = {
      User: { id: User.id, role: User.role }
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
