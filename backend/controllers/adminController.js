const User = require('../models/User');
const Child = require('../models/Child');
const Attendance = require('../models/Attendance');
const Activity = require('../models/Activity');
const Payment = require('../models/Payment');
const { pool } = require('../config/db');

// User Management

// Get all users by role
const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!['parent', 'employee', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be parent, employee, or admin'
      });
    }

    const users = await User.getByRole(role, page, limit);

    res.json({
      success: true,
      data: users
    });

  } catch (error) {
    console.error('Get users by role error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users'
    });
  }
};

// Create new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, address, qualifications, position } = req.body;

    // Validate required fields
    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and role are required'
      });
    }

    if (!['parent', 'employee', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be parent, employee, or admin'
      });
    }

    // Create user
    const userId = await User.create({
      name,
      email,
      password: password || 'password123', // Default password
      role,
      phone,
      address,
      qualifications,
      position
    });

    // Get created user
    const user = await User.findById(userId);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        user
      }
    });

  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating user'
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    const updated = await User.update(userId, updateData);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'User not found or no changes made'
      });
    }

    // Get updated user
    const user = await User.findById(userId);

    res.json({
      success: true,
      message: 'User updated successfully',
      data: {
        user
      }
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating user'
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deleted = await User.delete(userId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found or cannot delete admin users'
      });
    }

    res.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting user'
    });
  }
};

// Child Management

// Get all children
const getAllChildren = async (req, res) => {
  try {
    const { page = 1, limit = 10, class_id, status, search } = req.query;

    const filters = {};
    if (class_id) filters.class_id = class_id;
    if (status) filters.status = status;
    if (search) filters.search = search;

    const children = await Child.getAll(page, limit, filters);

    res.json({
      success: true,
      data: children
    });

  } catch (error) {
    console.error('Get all children error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching children'
    });
  }
};

// Update child
const updateChild = async (req, res) => {
  try {
    const { childId } = req.params;
    const updateData = req.body;

    const updated = await Child.update(childId, updateData);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Child not found or no changes made'
      });
    }

    // Get updated child
    const child = await Child.findById(childId);

    res.json({
      success: true,
      message: 'Child updated successfully',
      data: {
        child
      }
    });

  } catch (error) {
    console.error('Update child error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating child'
    });
  }
};

// Class Management

// Get all classes
const getAllClasses = async (req, res) => {
  try {
    const [classes] = await pool.execute(`
      SELECT c.*, u.name as teacher_name, COUNT(ch.id) as child_count
      FROM classes c
      LEFT JOIN users u ON c.employee_id = u.id
      LEFT JOIN children ch ON c.id = ch.class_id AND ch.status = 'enrolled'
      GROUP BY c.id
      ORDER BY c.name
    `);

    res.json({
      success: true,
      data: {
        classes
      }
    });

  } catch (error) {
    console.error('Get all classes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching classes'
    });
  }
};

// Create class
const createClass = async (req, res) => {
  try {
    const { name, age_group, capacity, employee_id } = req.body;

    if (!name || !age_group) {
      return res.status(400).json({
        success: false,
        message: 'Name and age group are required'
      });
    }

    const [result] = await pool.execute(
      'INSERT INTO classes (name, age_group, capacity, employee_id) VALUES (?, ?, ?, ?)',
      [name, age_group, capacity || 12, employee_id]
    );

    // Get created class
    const [classes] = await pool.execute(`
      SELECT c.*, u.name as teacher_name
      FROM classes c
      LEFT JOIN users u ON c.employee_id = u.id
      WHERE c.id = ?
    `, [result.insertId]);

    res.status(201).json({
      success: true,
      message: 'Class created successfully',
      data: {
        class: classes[0]
      }
    });

  } catch (error) {
    console.error('Create class error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating class'
    });
  }
};

// Update class
const updateClass = async (req, res) => {
  try {
    const { classId } = req.params;
    const { name, age_group, capacity, employee_id } = req.body;

    const [result] = await pool.execute(
      'UPDATE classes SET name = ?, age_group = ?, capacity = ?, employee_id = ? WHERE id = ?',
      [name, age_group, capacity, employee_id, classId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }

    // Get updated class
    const [classes] = await pool.execute(`
      SELECT c.*, u.name as teacher_name, COUNT(ch.id) as child_count
      FROM classes c
      LEFT JOIN users u ON c.employee_id = u.id
      LEFT JOIN children ch ON c.id = ch.class_id AND ch.status = 'enrolled'
      WHERE c.id = ?
      GROUP BY c.id
    `, [classId]);

    res.json({
      success: true,
      message: 'Class updated successfully',
      data: {
        class: classes[0]
      }
    });

  } catch (error) {
    console.error('Update class error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating class'
    });
  }
};

// Payment Management

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, child_id, parent_id, start_date, end_date } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (child_id) filters.child_id = child_id;
    if (parent_id) filters.parent_id = parent_id;
    if (start_date) filters.start_date = start_date;
    if (end_date) filters.end_date = end_date;

    const payments = await Payment.getAll(page, limit, filters);

    res.json({
      success: true,
      data: payments
    });

  } catch (error) {
    console.error('Get all payments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching payments'
    });
  }
};

// Create payment
const createPayment = async (req, res) => {
  try {
    const { child_id, amount, due_date, notes } = req.body;

    if (!child_id || !amount || !due_date) {
      return res.status(400).json({
        success: false,
        message: 'Child ID, amount, and due date are required'
      });
    }

    const paymentId = await Payment.create({
      child_id,
      amount,
      due_date,
      notes
    });

    // Get created payment
    const payment = await Payment.findById(paymentId);

    res.status(201).json({
      success: true,
      message: 'Payment created successfully',
      data: {
        payment
      }
    });

  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating payment'
    });
  }
};

// Mark payment as paid
const markPaymentAsPaid = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { payment_method } = req.body;

    const updated = await Payment.markAsPaid(paymentId, payment_method);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Get updated payment
    const payment = await Payment.findById(paymentId);

    res.json({
      success: true,
      message: 'Payment marked as paid successfully',
      data: {
        payment
      }
    });

  } catch (error) {
    console.error('Mark payment as paid error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating payment'
    });
  }
};

// Reports and Analytics

// Get system statistics
const getSystemStats = async (req, res) => {
  try {
    // Get user statistics
    const userStats = await User.getStats();
    
    // Get child statistics
    const childStats = await Child.getStats();
    
    // Get payment statistics
    const paymentStats = await Payment.getStats();
    
    // Get attendance statistics (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    const attendanceStats = await Attendance.getStats(thirtyDaysAgo, today);

    // Get recent activities count
    const [[activityStats]] = await pool.execute(`
      SELECT COUNT(*) as total_activities
      FROM activities 
      WHERE activity_date >= ?
    `, [thirtyDaysAgo]);

    res.json({
      success: true,
      data: {
        users: userStats,
        children: childStats,
        payments: paymentStats,
        attendance: {
          daily_stats: attendanceStats,
          total_days: attendanceStats.length,
          average_attendance_rate: attendanceStats.reduce((sum, day) => sum + parseFloat(day.attendance_rate), 0) / attendanceStats.length || 0
        },
        activities: {
          total_recent: activityStats.total_activities
        }
      }
    });

  } catch (error) {
    console.error('Get system stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching system statistics'
    });
  }
};

// Get attendance report
const getAttendanceReport = async (req, res) => {
  try {
    const { year, month } = req.query;
    
    const currentYear = year || new Date().getFullYear();
    const currentMonth = month || new Date().getMonth() + 1;

    const report = await Attendance.getMonthlyReport(currentYear, currentMonth);

    res.json({
      success: true,
      data: {
        report,
        period: {
          year: currentYear,
          month: currentMonth
        }
      }
    });

  } catch (error) {
    console.error('Get attendance report error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while generating attendance report'
    });
  }
};

// Get financial report
const getFinancialReport = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    // Set default date range (current month)
    const endDate = end_date || new Date().toISOString().split('T')[0];
    const startDate = start_date || new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];

    const [report] = await pool.execute(`
      SELECT 
        p.status,
        COUNT(*) as payment_count,
        SUM(p.amount) as total_amount,
        AVG(p.amount) as average_amount
      FROM payments p
      WHERE p.due_date BETWEEN ? AND ?
      GROUP BY p.status
      ORDER BY p.status
    `, [startDate, endDate]);

    const [monthlyTrend] = await pool.execute(`
      SELECT 
        DATE_FORMAT(due_date, '%Y-%m') as month,
        COUNT(*) as payment_count,
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) as paid_amount,
        SUM(CASE WHEN status = 'unpaid' THEN amount ELSE 0 END) as unpaid_amount
      FROM payments
      WHERE due_date >= DATE_SUB(?, INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(due_date, '%Y-%m')
      ORDER BY month
    `, [endDate]);

    res.json({
      success: true,
      data: {
        summary: report,
        monthly_trend: monthlyTrend,
        period: {
          start_date: startDate,
          end_date: endDate
        }
      }
    });

  } catch (error) {
    console.error('Get financial report error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while generating financial report'
    });
  }
};

// Admin dashboard data
const getAdminDashboard = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Get quick stats
    const userStats = await User.getStats();
    const childStats = await Child.getStats();
    const paymentStats = await Payment.getStats();

    // Get today's attendance
    const todaysAttendance = await Attendance.getByDate(today);
    const attendanceRate = todaysAttendance.length > 0 
      ? (todaysAttendance.filter(a => a.status === 'present').length / todaysAttendance.length * 100).toFixed(1)
      : 0;

    // Get recent activities
    const recentActivities = await Activity.getAll(1, 5);

    // Get overdue payments
    const overduePayments = await Payment.getOverduePayments();

    // Get upcoming events (you can expand this with an events table)
    const [upcomingEvents] = await pool.execute(`
      SELECT 
        'Parent-Teacher Conference' as title,
        '2024-01-20' as event_date,
        '3:00 PM - 6:00 PM' as time
      UNION ALL
      SELECT 
        'Staff Training' as title,
        '2024-01-22' as event_date,
        '9:00 AM - 12:00 PM' as time
      UNION ALL
      SELECT 
        'Field Trip - Zoo' as title,
        '2024-01-25' as event_date,
        '8:00 AM - 2:00 PM' as time
    `);

    res.json({
      success: true,
      data: {
        stats: {
          total_children: childStats.total_children,
          total_parents: userStats.total_parents,
          total_employees: userStats.total_employees,
          attendance_rate: attendanceRate,
          monthly_revenue: paymentStats.total_revenue_formatted,
          upcoming_events: upcomingEvents.length
        },
        todays_attendance: {
          total: todaysAttendance.length,
          present: todaysAttendance.filter(a => a.status === 'present').length,
          absent: todaysAttendance.filter(a => a.status === 'absent').length
        },
        recent_activities: recentActivities.activities,
        overdue_payments: overduePayments.slice(0, 5),
        upcoming_events: upcomingEvents
      }
    });

  } catch (error) {
    console.error('Get admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching admin dashboard data'
    });
  }
};

module.exports = {
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
};