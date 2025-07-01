const express = require('express');
const { registerVolunteer, loginVolunteer, loginOrganization, loginUser,loginAdmin } = require('../controllers/authController');
const router = express.Router();

// Register Route
router.post('/registerVolunteer', registerVolunteer);

// Login Routes
router.post('/loginVolunteer', loginVolunteer);
router.post('/volunteer-login', loginVolunteer); // Additional endpoint for frontend compatibility
router.post('/loginOrganization', loginOrganization);
router.post('/organization-login', loginOrganization); // Additional endpoint for frontend compatibility
router.post('/loginUser', loginUser);
router.post('/user-login', loginUser); // Additional endpoint for frontend compatibility
router.post('/loginAdmin', loginAdmin);
router.post('/admin-login', loginAdmin); // Additional endpoint for frontend compatibility

module.exports = router;
//these are for defining the post routes