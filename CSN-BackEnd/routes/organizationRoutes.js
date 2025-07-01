const express = require('express');
const { registerOrganization, getOrganizationProfile } = require('../controllers/organizationController');
const authMiddleware = require('../middleware/authMiddleWare');
const router = express.Router();

// Register Organization
router.post('/registerOrganization', registerOrganization);

// Get Organization Profile (Protected)
router.get('/profile', authMiddleware, getOrganizationProfile);

module.exports = router;
