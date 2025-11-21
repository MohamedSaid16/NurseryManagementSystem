const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/roleMiddleware');
const {
  // User Management
  getUsersByRole,
  createUser,
  updateUser,
  deleteUser,
  
  // Child Management
  getAllChildren,
  updateChild,
  
  // Class Management
  getAllClasses,
  createClass,
  updateClass,
  
  // Payment Management
  getAllPayments,
  createPayment,
  markPaymentAsPaid,
  
  // Reports
  getSystemStats,
  getAttendanceReport,
  getFinancialReport,
  getAdminDashboard
} = require('../controllers/adminController');

// All routes require authentication and admin role
router.use(authMiddleware, requireAdmin);

// Dashboard
router.get('/dashboard', getAdminDashboard);

// User Management
router.get('/users/:role', getUsersByRole);
router.post('/users', createUser);
router.put('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

// Child Management
router.get('/children', getAllChildren);
router.put('/children/:childId', updateChild);

// Class Management
router.get('/classes', getAllClasses);
router.post('/classes', createClass);
router.put('/classes/:classId', updateClass);

// Payment Management
router.get('/payments', getAllPayments);
router.post('/payments', createPayment);
router.put('/payments/:paymentId/paid', markPaymentAsPaid);

// Reports
router.get('/stats/system', getSystemStats);
router.get('/reports/attendance', getAttendanceReport);
router.get('/reports/financial', getFinancialReport);

module.exports = router;