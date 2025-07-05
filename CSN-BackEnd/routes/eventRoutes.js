const express = require('express');
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  assignVolunteer,
  removeVolunteer,
  getEventsByOrganizer,
  getEventsByVolunteer
} = require('../controllers/eventController');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

// Create event (Organization only)
router.post('/', auth, createEvent);

// Get all events
router.get('/', getEvents);

// Get events by organizer
router.get('/organizer/:id', auth, getEventsByOrganizer);

// Get events by volunteer
router.get('/volunteer/:id', auth, getEventsByVolunteer);

// Get event by ID
router.get('/:id', getEventById);

// Update event
router.put('/:id', auth, updateEvent);

// Delete event
router.delete('/:id', auth, deleteEvent);

// Assign volunteer to event
router.post('/:id/assign-volunteer', auth, assignVolunteer);

// Remove volunteer from event
router.delete('/:id/remove-volunteer/:volunteerId', auth, removeVolunteer);

module.exports = router;