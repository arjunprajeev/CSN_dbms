const mongoose = require('mongoose');

const OrganisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required:true,
  },
  contactNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
});

module.exports = mongoose.model('Organisation', OrganisationSchema);
