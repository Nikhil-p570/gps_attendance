const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'role'
  },
  role: {
    type: String,
    enum: ["admin", "student", "orgMember"],
    required: true
  },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    default: "Present"
  },
  date: {
    type: Date,
    default: Date.now
  },
  location: {
    latitude: Number,
    longitude: Number
  }
});

module.exports = mongoose.model("Attendance", attendanceSchema);
