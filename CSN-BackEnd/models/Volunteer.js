const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required:true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  skills: {
    type: [String], // Array of skills
    required: false,
  },
  availability: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model based on the schema
const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
