const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const studentRoutes = require('./routes/student');
const attendanceRoutes = require('./routes/attendance');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);

mongoose.connect('mongodb+srv://anshumaantiwari2003:Ans%23umaan2003@studentcluster.5zi0e3s.mongodb.net/mca_attendance?retryWrites=true&w=majority')
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
