const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Volunteer = require('../models/Volunteer');
const Organization = require('../models/Organization');
const admin1 = require('../models/Admin');

require('dotenv').config();

// Register Volunteer
exports.registerVolunteer = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let volunteer = await Volunteer.findOne({ email });
    if (volunteer) {
      return res.status(400).json({ msg: 'Volunteer already exists' });
    }

    volunteer = new Volunteer({ name, email, password, role });

    await volunteer.save();

    const payload = {
      volunteer: { id: volunteer.id }
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
//admin login

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let admin = await admin1.findOne({email});
    if (!admin) {
      return res.status(400).json({ msg: 'Invalid email' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    const payload = {
      admin: { id: admin.id }
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


// Login User
exports.loginVolunteer = async (req, res) => {
  const { email, password } = req.body;
  try {
    let volunteer = await Volunteer.findOne({email});
    if (!volunteer) {
      return res.status(400).json({ msg: 'Invalid email' });
    }
    const isMatch = await bcrypt.compare(password, volunteer.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    const payload = {
      volunteer: { id: volunteer.id }
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

exports.loginOrganization = async (req, res) => {
  const { email, password } = req.body;
  try {
    let organization = await Organization.findOne({email});
    if (!organization) {
      return res.status(400).json({ msg: 'Invalid email' });
    }
    const isMatch = await bcrypt.compare(password, organization.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    const payload = {
      organization: { id: organization.id }
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

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    const payload = {
      user: { id: user.id}
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
