const Volunteer = require('../models/Volunteer');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');

// Get all volunteers (Admin only)
exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().select('-password');
    res.json(volunteers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get volunteer by ID
exports.getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id).select('-password');
    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }
    res.json(volunteer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Get volunteer dashboard data
exports.getVolunteerDashboard = async (req, res) => {
  try {
    const volunteerId = req.params.id;
    
    // Get volunteer info
    const volunteer = await Volunteer.findById(volunteerId).select('-password');
    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }

    // Get upcoming events for this volunteer
    const upcomingEvents = await Event.find({
      'volunteers.volunteer': volunteerId,
      date: { $gte: new Date() },
      status: 'upcoming'
    }).populate('organizer', 'name').sort({ date: 1 }).limit(5);

    // Get completed events count
    const completedEvents = await Event.countDocuments({
      'volunteers.volunteer': volunteerId,
      'volunteers.status': 'completed'
    });

    // Get pending events count
    const pendingEvents = await Event.countDocuments({
      'volunteers.volunteer': volunteerId,
      'volunteers.status': 'pending'
    });

    // Get total hours (mock calculation - you can enhance this)
    const totalHours = completedEvents * 4; // Assuming 4 hours per event

    const dashboardData = {
      volunteer: {
        name: volunteer.name,
        email: volunteer.email,
        skills: volunteer.skills,
        profilePicture: volunteer.profilePicture,
        totalHours,
        completedEvents,
        pendingEvents
      },
      upcomingEvents,
      stats: {
        totalEvents: completedEvents + pendingEvents,
        completedEvents,
        pendingEvents,
        totalHours
      }
    };

    res.json(dashboardData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get volunteer tasks/events
exports.getVolunteerTasks = async (req, res) => {
  try {
    const volunteerId = req.params.id;
    
    const events = await Event.find({
      'volunteers.volunteer': volunteerId
    }).populate('organizer', 'name email').sort({ date: -1 });

    const tasks = events.map(event => {
      const volunteerInfo = event.volunteers.find(v => v.volunteer.toString() === volunteerId);
      return {
        id: event._id,
        title: event.title,
        description: event.description,
        date: event.date,
        location: event.location,
        organizer: event.organizer,
        status: volunteerInfo ? volunteerInfo.status : 'pending',
        priority: event.priority,
        skillsRequired: event.skillsRequired
      };
    });

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update volunteer profile
exports.updateVolunteerProfile = async (req, res) => {
  try {
    const { name, email, contactNumber, address, skills, profilePicture } = req.body;
    
    // Build profile object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (email) profileFields.email = email;
    if (contactNumber) profileFields.contactNumber = contactNumber;
    if (address) profileFields.address = address;
    if (skills) profileFields.skills = skills;
    if (profilePicture) profileFields.profilePicture = profilePicture;

    let volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== volunteer.email) {
      const existingVolunteer = await Volunteer.findOne({ email });
      if (existingVolunteer) {
        return res.status(400).json({ msg: 'Email already in use' });
      }
    }

    volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { $set: profileFields },
      { new: true }
    ).select('-password');

    res.json(volunteer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update volunteer availability
exports.updateAvailability = async (req, res) => {
  try {
    const { selectedDates } = req.body;
    
    if (!selectedDates || !Array.isArray(selectedDates)) {
      return res.status(400).json({ msg: 'Selected dates are required' });
    }

    const availabilityDates = selectedDates.map(date => ({
      date: new Date(date),
      isAvailable: true
    }));

    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          availabilityDates: availabilityDates,
          availability: 'Custom dates selected'
        }
      },
      { new: true }
    ).select('-password');

    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }

    res.json({ 
      msg: 'Availability updated successfully', 
      volunteer: volunteer 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update volunteer
exports.updateVolunteer = async (req, res) => {
  try {
    const { name, email, contactNumber, address, age, skills, availability } = req.body;
    
    // Build volunteer object
    const volunteerFields = {};
    if (name) volunteerFields.name = name;
    if (email) volunteerFields.email = email;
    if (contactNumber) volunteerFields.contactNumber = contactNumber;
    if (address) volunteerFields.address = address;
    if (age) volunteerFields.age = age;
    if (skills) volunteerFields.skills = skills;
    if (availability) volunteerFields.availability = availability;

    let volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }

    volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { $set: volunteerFields },
      { new: true }
    ).select('-password');

    res.json(volunteer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete volunteer
exports.deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }

    await Volunteer.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Volunteer deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get volunteer messages/notifications
exports.getVolunteerMessages = async (req, res) => {
  try {
    const volunteerId = req.params.id;
    
    // Get events where volunteer is involved
    const events = await Event.find({
      'volunteers.volunteer': volunteerId
    }).populate('organizer', 'name').sort({ createdAt: -1 });

    const messages = events.map(event => ({
      id: event._id,
      title: `Event: ${event.title}`,
      message: `You have been assigned to "${event.title}" scheduled for ${event.date.toDateString()}`,
      type: 'event_assignment',
      date: event.createdAt,
      isRead: false
    }));

    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};