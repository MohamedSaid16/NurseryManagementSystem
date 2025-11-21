const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  login,
  register,
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/authController');

// Public routes
router.post('/login', login);
router.post('/register', register);

// Protected routes
router.get('/me', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.put('/change-password', authMiddleware, changePassword);

module.exports = router;