const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { role, fullName, email, password, institution, classes, organization, admins } = req.body;
    console.log(req.body)

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      role,
      fullName,
      email,
      password: hashedPassword,
    };

    if (role === 'admin') {
      newUserData.institution = institution;
    } else if (role === 'student') {
      newUserData.classes = classes;
      newUserData.admins = admins; // selected admin IDs
    } else if (role === 'organization') {
      newUserData.organization = organization;
      newUserData.admins = admins; // selected admin IDs
    } 

    const newUser = new User(newUserData);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during registration" });
  }
};
