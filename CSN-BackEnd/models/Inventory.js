const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['food', 'clothing', 'medicine', 'books', 'electronics', 'toys', 'other'],
  },
  subcategory: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    required: true,
    enum: ['pieces', 'kg', 'liters', 'boxes', 'bags', 'bottles'],
  },
  description: {
    type: String,
    required: false,
  },
  condition: {
    type: String,
    enum: ['new', 'good', 'fair', 'poor'],
    default: 'good',
  },
  donatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: false,
  },
  reservedDate: {
    type: Date,
    required: false,
  },
  distributedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: false,
  },
  distributedDate: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

inventorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;