const Child = require('../models/Child');
const Attendance = require('../models/Attendance');
const Activity = require('../models/Activity');
const Payment = require('../models/Payment');
const { pool } = require('../config/db');

// Get parent's children
const getMyChildren = async (req, res) => {
  try {
    const children = await Child.findByParentId(req.user.id);

    res.json({
      success: true,
      data: {
        children
      }
    });

  } catch (error) {
    console.error('Get children error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching children'
    });
  }
};

// Register new child
const registerChild = async (req, res) => {
  try {
    const { name, birth_date, gender, allergies, medical_conditions, class_id } = req.body;

    // Validate required fields
    if (!name || !birth_date || !gender) {
      return res.status(400).json({
        success: false,
        message: 'Name, birth date, and gender are required'
      });
    }

    // Validate gender
    if (!['male', 'female', 'other'].includes(gender)) {
      return res.status(400).json({
        success: false,
        message: 'Gender must be male, female, or other'
      });
    }

    // Create child
    const childId = await Child.create({
      parent_id: req.user.id,
      class_id,
      name,
      birth_date,
      gender,
      allergies,
      medical_conditions
    });

    // Get created child with details
    const child = await Child.findById(childId);

    res.status(201).json({
      success: true,
      message: 'Child registered successfully',
      data: {
        child
      }
    });

  } catch (error) {
    console.error('Register child error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while registering child'
    });
  }
};

// Get child details
const getChildDetails = async (req, res) => {
  try {
    const { childId } = req.params;

    // Verify that the child belongs to the parent
    const children = await Child.findByParentId(req.user.id);
    const child = children.find(c => c.id == childId);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found or access denied'
      });
    }

    // Get detailed child information
    const childDetails = await Child.findById(childId);

    res.json({
      success: true,
      data: {
        child: childDetails
      }
    });

  } catch (error) {
    console.error('Get child details error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching child details'
    });
  }
};

// Get child attendance
const getChildAttendance = async (req, res) => {
  try {
    const { childId } = req.params;
    const { start_date, end_date } = req.query;

    // Verify that the child belongs to the parent
    const children = await Child.findByParentId(req.user.id);
    const child = children.find(c => c.id == childId);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found or access denied'
      });
    }

    // Set default date range (last 30 days)
    const endDate = end_date || new Date().toISOString().split('T')[0];
    const startDate = start_date || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const attendance = await Attendance.getByChild(childId, startDate, endDate);

    // Get attendance summary
    const summary = await Attendance.getChildSummary(childId);

    res.json({
      success: true,
      data: {
        attendance,
        summary
      }
    });

  } catch (error) {
    console.error('Get child attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching attendance'
    });
  }
};

// Get child activities
const getChildActivities = async (req, res) => {
  try {
    const { childId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    // Verify that the child belongs to the parent
    const children = await Child.findByParentId(req.user.id);
    const child = children.find(c => c.id == childId);

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found or access denied'
      });
    }

    const activities = await Activity.getByChild(childId, page, limit);

    res.json({
      success: true,
      data: activities
    });

  } catch (error) {
    console.error('Get child activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching activities'
    });
  }
};

// Get parent's payments
const getMyPayments = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const filters = { parent_id: req.user.id };
    if (status) filters.status = status;

    const payments = await Payment.getByParent(req.user.id, page, limit);

    // Get payment statistics
    const stats = await Payment.getStats();

    res.json({
      success: true,
      data: {
        ...payments,
        stats: {
          total_payments: stats.total_payments,
          paid_payments: stats.paid_payments,
          unpaid_payments: stats.unpaid_payments,
          overdue_payments: stats.overdue_payments,
          total_revenue: stats.total_revenue_formatted,
          pending_revenue: stats.pending_revenue_formatted
        }
      }
    });

  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching payments'
    });
  }
};

// Get parent dashboard data
const getDashboardData = async (req, res) => {
  try {
    // Get children
    const children = await Child.findByParentId(req.user.id);

    // Get recent activities for all children
    let recentActivities = [];
    for (const child of children) {
      const activities = await Activity.getByChild(child.id, 1, 5);
      recentActivities = [...recentActivities, ...activities.activities.slice(0, 3)];
    }

    // Sort activities by date and take latest 5
    recentActivities.sort((a, b) => new Date(b.activity_date) - new Date(a.activity_date));
    recentActivities = recentActivities.slice(0, 5);

    // Get upcoming payments
    const today = new Date().toISOString().split('T')[0];
    const [upcomingPayments] = await pool.execute(`
      SELECT p.*, c.name as child_name
      FROM payments p
      JOIN children c ON p.child_id = c.id
      WHERE c.parent_id = ? AND p.due_date >= ? AND p.status = 'unpaid'
      ORDER BY p.due_date ASC
      LIMIT 5
    `, [req.user.id, today]);

    // Get attendance summary for each child
    const childrenWithAttendance = await Promise.all(
      children.map(async (child) => {
        const summary = await Attendance.getChildSummary(child.id);
        return {
          ...child,
          attendance_summary: summary
        };
      })
    );

    res.json({
      success: true,
      data: {
        children: childrenWithAttendance,
        recent_activities: recentActivities,
        upcoming_payments: upcomingPayments,
        stats: {
          total_children: children.length,
          children_present_today: 0, // You might want to calculate this
          unpaid_payments: upcomingPayments.length
        }
      }
    });

  } catch (error) {
    console.error('Get dashboard data error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data'
    });
  }
};

module.exports = {
  getMyChildren,
  registerChild,
  getChildDetails,
  getChildAttendance,
  getChildActivities,
  getMyPayments,
  getDashboardData
};