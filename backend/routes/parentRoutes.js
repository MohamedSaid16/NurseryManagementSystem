const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { requireParent } = require('../middleware/roleMiddleware');
const {
  getMyChildren,
  registerChild,
  getChildDetails,
  getChildAttendance,
  getChildActivities,
  getMyPayments,
  getDashboardData
} = require('../controllers/parentController');

// All routes require authentication and parent role
router.use(authMiddleware, requireParent);

// Dashboard
router.get('/dashboard', getDashboardData);

// Children management
router.get('/children', getMyChildren);
router.post('/children', registerChild);
router.get('/children/:childId', getChildDetails);
router.get('/children/:childId/attendance', getChildAttendance);
router.get('/children/:childId/activities', getChildActivities);

// Payments
router.get('/payments', getMyPayments);

module.exports = router;