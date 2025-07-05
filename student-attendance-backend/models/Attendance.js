const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: String,
  date: Date,
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
  },
}, { timeseries: { timeField: 'date', metaField: 'studentId', granularity: 'hours' } });

module.exports = mongoose.model('Attendance', attendanceSchema);
