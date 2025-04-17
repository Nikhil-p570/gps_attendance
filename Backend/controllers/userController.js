const User = require('../models/User');

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }, '_id fullName institution');
    res.json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch admins" });
  }
};
 