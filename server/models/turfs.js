import mongoose from "mongoose";

const turfSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: true,
    trim: true
  },

  // Rating (auto-calculated from reviews, not set by owner)
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },

  // Images - Array for 2-3 photos
  images: [{
    type: String, // URLs of uploaded images
    required: true
  }],

  // Pricing - Three different rates
  rates: {
    standard: {
      type: Number,
      required: true,
      min: 0
    },
    peakHour: {
      type: Number,
      required: true,
      min: 0
    },
    weekend: {
      type: Number,
      required: true,
      min: 0
    }
  },

  // Location
  location: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },

  // Contact Information
  contact: {
    primary: {
      type: String,
      required: true
    },
    alternate: {
      type: String
    }
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },

  // Facilities (Array of strings)
  facilities: [{
    type: String,
    required: true
  }],

  // Additional useful fields
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
  },

  status: {
    type: String,
    enum: ['active', 'maintenance'],
    default: 'active'
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  // For timing (if needed later)
  openingTime: {
    type: String,
    default: "06:00"
  },

  closingTime: {
    type: String,
    default: "24:00"
  },

  timeSlots: {
    type: [String],
    required: true
  },

  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  }],

  totalBookings: {
    type: Number,
    default: 0,
    min: 0
  },

  revenue: {
    type: Number,
    default: 0,
    min: 0
  },
});

export default mongoose.model('Turf', turfSchema);