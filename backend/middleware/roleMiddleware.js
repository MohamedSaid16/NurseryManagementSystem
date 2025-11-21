const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication required.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
    }

    next();
  };
};

// Specific role middlewares
const requireParent = roleMiddleware(['parent']);
const requireEmployee = roleMiddleware(['employee']);
const requireAdmin = roleMiddleware(['admin']);
const requireStaff = roleMiddleware(['employee', 'admin']);

module.exports = {
  roleMiddleware,
  requireParent,
  requireEmployee,
  requireAdmin,
  requireStaff
};