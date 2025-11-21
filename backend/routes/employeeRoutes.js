const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { requireEmployee } = require('../middleware/roleMiddleware');
const {
  getClassChildren,
  markAttendance,
  getAttendanceByDate,
  logActivity,
  getMyActivities,
  addChildNote,
  getChildNotes,
  getDashboardData
} = require('../controllers/employeeController');

// All routes require authentication and employee role
router.use(authMiddleware, requireEmployee);

// Dashboard
router.get('/dashboard', getDashboardData);

// Attendance
router.post('/attendance', markAttendance);
router.get('/attendance/:date', getAttendanceByDate);

// Children
router.get('/classes/:classId/children', getClassChildren);

// Activities
router.post('/activities', logActivity);
router.get('/activities', getMyActivities);

// Child notes
router.post('/child-notes', addChildNote);
router.get('/children/:childId/notes', getChildNotes);

module.exports = router;