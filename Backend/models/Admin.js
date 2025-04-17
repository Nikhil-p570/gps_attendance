const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  institutionName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  geofence: {  
    center: {
      lat: { type: Number },
      lng: { type: Number },
    },
    radius: { type: Number } // in meters
  },
});

module.exports = mongoose.model('Admin', AdminSchema);
