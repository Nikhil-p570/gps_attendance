const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registeredAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }],
  createdAt: { type: Date, default: Date.now },
  selectedAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],

});

module.exports = mongoose.model('Student', StudentSchema);
