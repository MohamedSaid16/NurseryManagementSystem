const { pool } = require('../config/db');

class Activity {
  // Create new activity
  static async create(activityData) {
    const {
      child_id,
      employee_id,
      activity_type,
      title,
      description,
      duration = null,
      activity_date = new Date()
    } = activityData;

    const [result] = await pool.execute(
      `INSERT INTO activities (child_id, employee_id, activity_type, title, description, duration, activity_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [child_id, employee_id, activity_type, title, description, duration, activity_date]
    );

    return result.insertId;
  }

  // Find activity by ID
  static async findById(id) {
    const [activities] = await pool.execute(`
      SELECT a.*, c.name as child_name, u.name as employee_name
      FROM activities a
      JOIN children c ON a.child_id = c.id
      JOIN users u ON a.employee_id = u.id
      WHERE a.id = ?
    `, [id]);

    return activities[0] || null;
  }

  // Get activities by child ID
  static async getByChild(childId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    const [activities] = await pool.execute(`
      SELECT a.*, u.name as employee_name
      FROM activities a
      JOIN users u ON a.employee_id = u.id
      WHERE a.child_id = ?
      ORDER BY a.activity_date DESC, a.created_at DESC
      LIMIT ? OFFSET ?
    `, [childId, limit, offset]);

    const [[{ total }]] = await pool.execute(
      'SELECT COUNT(*) as total FROM activities WHERE child_id = ?',
      [childId]
    );

    return {
      activities,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Get activities by employee ID
  static async getByEmployee(employeeId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    const [activities] = await pool.execute(`
      SELECT a.*, c.name as child_name, cls.name as class_name
      FROM activities a
      JOIN children c ON a.child_id = c.id
      LEFT JOIN classes cls ON c.class_id = cls.id
      WHERE a.employee_id = ?
      ORDER BY a.activity_date DESC, a.created_at DESC
      LIMIT ? OFFSET ?
    `, [employeeId, limit, offset]);

    const [[{ total }]] = await pool.execute(
      'SELECT COUNT(*) as total FROM activities WHERE employee_id = ?',
      [employeeId]
    );

    return {
      activities,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Get all activities with filters
  static async getAll(page = 1, limit = 10, filters = {}) {
    let query = `
      SELECT a.*, c.name as child_name, u.name as employee_name, cls.name as class_name
      FROM activities a
      JOIN children c ON a.child_id = c.id
      JOIN users u ON a.employee_id = u.id
      LEFT JOIN classes cls ON c.class_id = cls.id
      WHERE 1=1
    `;
    const values = [];

    // Apply filters
    if (filters.child_id) {
      query += ' AND a.child_id = ?';
      values.push(filters.child_id);
    }

    if (filters.employee_id) {
      query += ' AND a.employee_id = ?';
      values.push(filters.employee_id);
    }

    if (filters.activity_type) {
      query += ' AND a.activity_type = ?';
      values.push(filters.activity_type);
    }

    if (filters.start_date) {
      query += ' AND a.activity_date >= ?';
      values.push(filters.start_date);
    }

    if (filters.end_date) {
      query += ' AND a.activity_date <= ?';
      values.push(filters.end_date);
    }

    // Add pagination
    const offset = (page - 1) * limit;
    query += ' ORDER BY a.activity_date DESC, a.created_at DESC LIMIT ? OFFSET ?';
    values.push(limit, offset);

    const [activities] = await pool.execute(query, values);

    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM activities a
      JOIN children c ON a.child_id = c.id
      WHERE 1=1
    `;
    const countValues = [];

    if (filters.child_id) {
      countQuery += ' AND a.child_id = ?';
      countValues.push(filters.child_id);
    }

    if (filters.employee_id) {
      countQuery += ' AND a.employee_id = ?';
      countValues.push(filters.employee_id);
    }

    if (filters.activity_type) {
      countQuery += ' AND a.activity_type = ?';
      countValues.push(filters.activity_type);
    }

    if (filters.start_date) {
      countQuery += ' AND a.activity_date >= ?';
      countValues.push(filters.start_date);
    }

    if (filters.end_date) {
      countQuery += ' AND a.activity_date <= ?';
      countValues.push(filters.end_date);
    }

    const [[{ total }]] = await pool.execute(countQuery, countValues);

    return {
      activities,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Update activity
  static async update(id, updateData) {
    const allowedFields = ['activity_type', 'title', 'description', 'duration', 'activity_date'];
    const updates = [];
    const values = [];

    Object.keys(updateData).forEach(key => {
      if (allowedFields.includes(key) && updateData[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(updateData[key]);
      }
    });

    if (updates.length === 0) {
      throw new Error('No valid fields to update');
    }

    values.push(id);

    const [result] = await pool.execute(
      `UPDATE activities SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  }

  // Delete activity
  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM activities WHERE id = ?',
      [id]
    );

    return result.affectedRows > 0;
  }

  // Get activity statistics
  static async getStats(startDate, endDate) {
    const [stats] = await pool.execute(`
      SELECT 
        activity_type,
        COUNT(*) as total_activities,
        COUNT(DISTINCT child_id) as unique_children,
        COUNT(DISTINCT employee_id) as unique_employees
      FROM activities 
      WHERE activity_date BETWEEN ? AND ?
      GROUP BY activity_type
      ORDER BY total_activities DESC
    `, [startDate, endDate]);

    return stats;
  }
}

module.exports = Activity;