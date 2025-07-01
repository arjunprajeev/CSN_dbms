const Volunteer = require('../models/Volunteer');
const bcrypt = require('bcrypt');

// Register a new volunteer
const registerVolunteer = async (req, res) => {
  const { name, email, password, address, contactNumber, age } = req.body;

  try {
    // Check if volunteer already exists
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newVolunteer = new Volunteer({
      name,
      email,
      password: hashedPassword, // Store hashed password
      address,
      contactNumber,
      age,
    });
    await newVolunteer.save();
    res.status(201).json({ message: 'Volunteer registered successfully', volunteer: newVolunteer });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getVolunteerProfile = async (req, res) => {
  try {
    // Assuming req.user contains the authenticated user (after passing through auth middleware)
    const volunteer = await Volunteer.findById(req.user.id).select('-password'); // Exclude password from response

    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }

    res.status(200).json(volunteer);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = { registerVolunteer,getVolunteerProfile };
