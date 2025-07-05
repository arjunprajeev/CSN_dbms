const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Volunteer = require('../models/Volunteer');
const Organization = require('../models/Organization');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check which type of user this is
    if (decoded.user) {
      req.user = await User.findById(decoded.user.id).select('-password');
      req.userType = 'user';
    } else if (decoded.volunteer) {
      req.user = await Volunteer.findById(decoded.volunteer.id).select('-password');
      req.userType = 'volunteer';
    } else if (decoded.organization) {
      req.user = await Organization.findById(decoded.organization.id).select('-password');
      req.userType = 'organization';
    } else if (decoded.admin) {
      req.user = await Admin.findById(decoded.admin.id).select('-password');
      req.userType = 'admin';
    }

    if (!req.user) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }

    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Admin only middleware
const adminOnly = (req, res, next) => {
  if (req.userType !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Admin only.' });
  }
  next();
};

module.exports = { auth, adminOnly };