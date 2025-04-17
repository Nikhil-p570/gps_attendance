// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student', 'organization'], required: true },
  institutionName: String,   // for admin
  class: String,             // for student
  organizationName: String,  // for orgMember

  // ✅ Geofence field (only for admins)
  geofence: {
    center: {
      lat: Number,
      lng: Number,
    },
    radius: Number, // in meters
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
