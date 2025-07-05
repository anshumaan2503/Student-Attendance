const express = require('express');
const Attendance = require('../models/attendance');

const router = express.Router(); // ✅ This line is missing in your error

// Save or update attendance
router.post('/', async (req, res) => {
  const { studentId, date, status } = req.body;

  try {
    const existing = await Attendance.findOne({ studentId, date });

    if (existing) {
      existing.status = status;
      await existing.save();
      return res.json(existing);
    }

    const newRecord = new Attendance({ studentId, date, status });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (err) {
    console.error('Error saving attendance:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get attendance for a date
router.get('/', async (req, res) => {
  const { date } = req.query;

  try {
    const records = await Attendance.find({ date });
    res.json(records);
  } catch (err) {
    console.error('Error fetching attendance:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
