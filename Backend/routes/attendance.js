const express = require("express");
const Attendance = require("../models/attendance");
const router = express.Router();

// POST /api/attendance/mark
router.post("/mark", async (req, res) => {
  const { userId, role, location } = req.body;

  try {
    const newAttendance = new Attendance({
      userId,
      role,
      location
    });

    await newAttendance.save();
    res.status(201).json({ msg: "Attendance marked successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
