const Event = require('../models/Event');
const Volunteer = require('../models/Volunteer');
const Organization = require('../models/Organization');

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      maxVolunteers,
      skillsRequired,
      priority
    } = req.body;

    // Ensure the user is an organization
    if (req.userType !== 'organization') {
      return res.status(403).json({ msg: 'Only organizations can create events' });
    }

    const event = new Event({
      title,
      description,
      date: new Date(date),
      location,
      organizer: req.user._id,
      maxVolunteers: maxVolunteers || 10,
      skillsRequired: skillsRequired || [],
      priority: priority || 'medium'
    });

    await event.save();
    await event.populate('organizer', 'name email');

    res.status(201).json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const { status, priority, organizer } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (organizer) filter.organizer = organizer;

    const events = await Event.find(filter)
      .populate('organizer', 'name email')
      .populate('volunteers.volunteer', 'name email skills')
      .sort({ date: -1 });

    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('volunteers.volunteer', 'name email skills contactNumber');

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      maxVolunteers,
      skillsRequired,
      priority,
      status
    } = req.body;

    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if user is the organizer or admin
    if (req.userType !== 'admin' && event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized to update this event' });
    }

    const eventFields = {};
    if (title) eventFields.title = title;
    if (description) eventFields.description = description;
    if (date) eventFields.date = new Date(date);
    if (location) eventFields.location = location;
    if (maxVolunteers) eventFields.maxVolunteers = maxVolunteers;
    if (skillsRequired) eventFields.skillsRequired = skillsRequired;
    if (priority) eventFields.priority = priority;
    if (status) eventFields.status = status;

    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: eventFields },
      { new: true }
    ).populate('organizer', 'name email')
     .populate('volunteers.volunteer', 'name email skills');

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if user is the organizer or admin
    if (req.userType !== 'admin' && event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized to delete this event' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Event deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Assign volunteer to event
exports.assignVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.body;
    const eventId = req.params.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    const volunteer = await Volunteer.findById(volunteerId);
    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }

    // Check if volunteer is already assigned
    const alreadyAssigned = event.volunteers.find(
      v => v.volunteer.toString() === volunteerId
    );
    if (alreadyAssigned) {
      return res.status(400).json({ msg: 'Volunteer already assigned to this event' });
    }

    // Check if event is full
    if (event.volunteers.length >= event.maxVolunteers) {
      return res.status(400).json({ msg: 'Event is full' });
    }

    event.volunteers.push({
      volunteer: volunteerId,
      status: 'pending'
    });

    await event.save();
    await event.populate('volunteers.volunteer', 'name email skills');

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Remove volunteer from event
exports.removeVolunteer = async (req, res) => {
  try {
    const eventId = req.params.id;
    const volunteerId = req.params.volunteerId;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Remove volunteer from event
    event.volunteers = event.volunteers.filter(
      v => v.volunteer.toString() !== volunteerId
    );

    await event.save();
    res.json({ msg: 'Volunteer removed from event successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get events by organizer
exports.getEventsByOrganizer = async (req, res) => {
  try {
    const organizerId = req.params.id;
    
    const events = await Event.find({ organizer: organizerId })
      .populate('volunteers.volunteer', 'name email skills')
      .sort({ date: -1 });

    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get events by volunteer
exports.getEventsByVolunteer = async (req, res) => {
  try {
    const volunteerId = req.params.id;
    
    const events = await Event.find({
      'volunteers.volunteer': volunteerId
    }).populate('organizer', 'name email')
      .sort({ date: -1 });

    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};