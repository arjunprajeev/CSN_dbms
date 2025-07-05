const express = require('express');
const { 
  getVolunteers, 
  getVolunteerById, 
  updateVolunteer, 
  deleteVolunteer,
  updateAvailability,
  getVolunteerDashboard,
  getVolunteerTasks,
  updateVolunteerProfile
} = require('../controllers/volunteerController');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get all volunteers (admin only)
router.get('/', getVolunteers);

// Get volunteer dashboard data
router.get('/dashboard/:id', auth, getVolunteerDashboard);

// Get volunteer tasks
router.get('/tasks/:id', auth, getVolunteerTasks);

// Get volunteer by ID
router.get('/:id', auth, getVolunteerById);

// Update volunteer profile
router.put('/profile/:id', auth, updateVolunteerProfile);

// Update volunteer availability
router.put('/availability/:id', auth, updateAvailability);

// Update volunteer
router.put('/:id', auth, updateVolunteer);

// Delete volunteer
router.delete('/:id', auth, deleteVolunteer);

module.exports = router;