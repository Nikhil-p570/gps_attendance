const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const authController = require('../controllers/authController');

// ✅ Middleware to verify JWT token from cookies
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// ✅ Get currently logged-in user
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Registration (delegated to controller)
router.post('/register', authController.register);

// ✅ Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false, // set to true if using HTTPS
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: 'Login successful',
        user: {
          id: user._id,
          role: user.role,
          fullName: user.fullName,
          email: user.email,
        },
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// ✅ Get All Admins
router.get('/get-admins', async (req, res) => {
  console.log("📣 GET /api/auth/get-admins");
  try {
    const admins = await User.find({ role: 'admin' }).select('_id fullName email');
    res.status(200).json({ admins });
  } catch (err) {
    console.error('❌ Error fetching admins:', err);
    res.status(500).json({ message: 'Error fetching admins' });
  }
});

// ✅ Get Admins' Geofences for a Student
router.get('/get-my-admins/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate('selectedAdmins');
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const geofences = student.selectedAdmins.map((admin) => ({
      id: admin._id,
      name: admin.institutionName,
      center: admin.geofence?.center,
      radius: admin.geofence?.radius,
    }));

    res.json(geofences);
  } catch (err) {
    console.error('❌ Error fetching admin geofences:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Save or Update Geofence for Admin
router.post('/save-geofence/:adminId', async (req, res) => {
  const { center, radius } = req.body;

  try {
    console.log("📍 Geofence update for Admin:", req.params.adminId);
    const admin = await User.findOne({ _id: req.params.adminId, role: 'admin' });

    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    admin.geofence = { center, radius };
    await admin.save();

    res.json({ message: 'Geofence updated successfully', geofence: admin.geofence });
  } catch (err) {
    console.error('❌ Error saving geofence:', err);
    res.status(500).json({ message: 'Failed to update geofence' });
  }
});

module.exports = router;
