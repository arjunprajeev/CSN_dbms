const express = require('express');
const { loginAdmin } = require('../controllers/adminController');
//const authMiddleware = require('../middleware/authMiddleWare'); // Adjust the path as needed
const router = express.Router();

// Admin Login
router.post('/login', loginAdmin);

// Add other admin routes here (e.g., managing organizations, volunteers, etc.)
// Example: router.get('/manage-volunteers', authMiddleware, manageVolunteers);

module.exports = router;
