const mongoose = require('mongoose');

const OrgMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizationName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registeredAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('OrgMember', OrgMemberSchema);
