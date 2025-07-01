const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Organization = require('../models/Organization');
require('dotenv').config();

// Register Organization
exports.registerOrganization = async (req, res) => {
  const { name, email, password,address,contactNumber,role = 'organization' } = req.body;
  try {
    let organization = await Organization.findOne({ email });
    if (organization) {
      return res.status(400).json({ msg: 'Organization already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    neworganization = new Organization({ name, email, password:hashedPassword,address,contactNumber,role });

    await neworganization.save();
    res.status(201).json({ message: 'Organization registered successfully', organization: neworganization });
    const payload = {
      Organization: { id: Organization.id, role: Organization.role }
    };
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};  

// Get Organization Profile
exports.getOrganizationProfile = async (req, res) => {
  try {
    const organization = await Organization.findById(req.organization.id).select('-password');
    res.json(organization);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
