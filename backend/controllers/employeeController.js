const Child = require('../models/Child');
const Attendance = require('../models/Attendance');
const Activity = require('../models/Activity');
const ChildNote = require('../models/ChildNote');
const { pool } = require('../config/db');

// Get employee's class children
const getClassChildren = async (req, res) => {
  try {
    const { classId } = req.params;
    const children = await Child.getByClass(classId);

    res.json({
      success: true,
      data: {
        children
      }
    });

  } catch (error) {
    console.error('Get class children error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching class children'
    });
  }
};

// Mark attendance
const markAttendance = async (req, res) => {
  try {
    const { attendances } = req.body;

    if (!attendances || !Array.isArray(attendances)) {
      return res.status(400).json({
        success: false,
        message: 'Attendances array is required'
      });
    }

    const results = await Attendance.markMultiple(attendances);

    res.json({
      success: true,
      message: 'Attendance marked successfully',
      data: {
        results
      }
    });

  } catch (error) {
    console.error('Mark attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while marking attendance'
    });
  }
};

// Get attendance for date
const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const { classId } = req.query;

    const attendance = await Attendance.getByDate(date, classId);

    res.json({
      success: true,
      data: {
        attendance,
        date,
        total_children: attendance.length,
        present_count: attendance.filter(a => a.status === 'present').length,
        absent_count: attendance.filter(a => a.status === 'absent').length
      }
    });

  } catch (error) {
    console.error('Get attendance by date error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching attendance'
    });
  }
};

// Log activity
const logActivity = async (req, res) => {
  try {
    const { child_id, activity_type, title, description, duration, activity_date } = req.body;

    // Validate required fields
    if (!child_id || !activity_type || !title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Child ID, activity type, title, and description are required'
      });
    }

    // Validate activity type
    const validActivityTypes = ['art', 'music', 'outdoor', 'learning', 'nap', 'meal', 'other'];
    if (!validActivityTypes.includes(activity_type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid activity type'
      });
    }

    // Create activity
    const activityId = await Activity.create({
      child_id,
      employee_id: req.user.id,
      activity_type,
      title,
      description,
      duration,
      activity_date
    });

    // Get created activity with details
    const activity = await Activity.findById(activityId);

    res.status(201).json({
      success: true,
      message: 'Activity logged successfully',
      data: {
        activity
      }
    });

  } catch (error) {
    console.error('Log activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while logging activity'
    });
  }
};

// Get employee's activities
const getMyActivities = async (req, res) => {
  try {
    const { page = 1, limit = 10, child_id, activity_type, start_date, end_date } = req.query;

    const filters = { employee_id: req.user.id };
    if (child_id) filters.child_id = child_id;
    if (activity_type) filters.activity_type = activity_type;
    if (start_date) filters.start_date = start_date;
    if (end_date) filters.end_date = end_date;

    const activities = await Activity.getAll(page, limit, filters);

    res.json({
      success: true,
      data: activities
    });

  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching activities'
    });
  }
};

// Add child note
const addChildNote = async (req, res) => {
  try {
    const { child_id, category, title, content } = req.body;

    // Validate required fields
    if (!child_id || !title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Child ID, title, and content are required'
      });
    }

    // Validate category
    const validCategories = ['general', 'behavior', 'development', 'health', 'academic'];
    if (category && !validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }

    // Create note
    const [result] = await pool.execute(
      `INSERT INTO child_notes (child_id, employee_id, category, title, content) 
       VALUES (?, ?, ?, ?, ?)`,
      [child_id, req.user.id, category || 'general', title, content]
    );

    // Get created note with details
    const [notes] = await pool.execute(`
      SELECT cn.*, c.name as child_name, u.name as employee_name, cls.name as class_name
      FROM child_notes cn
      JOIN children c ON cn.child_id = c.id
      JOIN users u ON cn.employee_id = u.id
      LEFT JOIN classes cls ON c.class_id = cls.id
      WHERE cn.id = ?
    `, [result.insertId]);

    res.status(201).json({
      success: true,
      message: 'Child note added successfully',
      data: {
        note: notes[0]
      }
    });

  } catch (error) {
    console.error('Add child note error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding child note'
    });
  }
};

// Get child notes
const getChildNotes = async (req, res) => {
  try {
    const { childId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const [notes] = await pool.execute(`
      SELECT cn.*, u.name as employee_name
      FROM child_notes cn
      JOIN users u ON cn.employee_id = u.id
      WHERE cn.child_id = ?
      ORDER BY cn.created_at DESC
      LIMIT ? OFFSET ?
    `, [childId, parseInt(limit), (parseInt(page) - 1) * parseInt(limit)]);

    const [[{ total }]] = await pool.execute(
      'SELECT COUNT(*) as total FROM child_notes WHERE child_id = ?',
      [childId]
    );

    res.json({
      success: true,
      data: {
        notes,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get child notes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching child notes'
    });
  }
};

// Get employee dashboard data
const getDashboardData = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Get today's attendance
    const todaysAttendance = await Attendance.getByDate(today);
    
    // Get employee's recent activities
    const recentActivities = await Activity.getByEmployee(req.user.id, 1, 5);
    
    // Get employee's class assignments
    const [classes] = await pool.execute(`
      SELECT c.*, COUNT(ch.id) as child_count
      FROM classes c
      LEFT JOIN children ch ON c.id = ch.class_id AND ch.status = 'enrolled'
      WHERE c.employee_id = ?
      GROUP BY c.id
    `, [req.user.id]);

    // Get statistics
    const [[activityStats]] = await pool.execute(`
      SELECT COUNT(*) as total_activities
      FROM activities 
      WHERE employee_id = ? AND activity_date = ?
    `, [req.user.id, today]);

    const [[noteStats]] = await pool.execute(`
      SELECT COUNT(*) as total_notes
      FROM child_notes 
      WHERE employee_id = ? AND DATE(created_at) = ?
    `, [req.user.id, today]);

    res.json({
      success: true,
      data: {
        todays_attendance: {
          list: todaysAttendance,
          total: todaysAttendance.length,
          present: todaysAttendance.filter(a => a.status === 'present').length,
          absent: todaysAttendance.filter(a => a.status === 'absent').length
        },
        recent_activities: recentActivities.activities,
        classes,
        stats: {
          activities_today: activityStats.total_activities,
          notes_today: noteStats.total_notes,
          total_children: classes.reduce((sum, cls) => sum + cls.child_count, 0)
        }
      }
    });

  } catch (error) {
    console.error('Get employee dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data'
    });
  }
};

module.exports = {
  getClassChildren,
  markAttendance,
  getAttendanceByDate,
  logActivity,
  getMyActivities,
  addChildNote,
  getChildNotes,
  getDashboardData
};