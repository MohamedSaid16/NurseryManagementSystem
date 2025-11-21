const { pool } = require('../config/db');

class ChildNote {
  // Create new child note
  static async create(noteData) {
    const {
      child_id,
      employee_id,
      category = 'general',
      title,
      content
    } = noteData;

    const [result] = await pool.execute(
      `INSERT INTO child_notes (child_id, employee_id, category, title, content) 
       VALUES (?, ?, ?, ?, ?)`,
      [child_id, employee_id, category, title, content]
    );

    return result.insertId;
  }

  // Find note by ID
  static async findById(id) {
    const [notes] = await pool.execute(`
      SELECT cn.*, c.name as child_name, u.name as employee_name, cls.name as class_name
      FROM child_notes cn
      JOIN children c ON cn.child_id = c.id
      JOIN users u ON cn.employee_id = u.id
      LEFT JOIN classes cls ON c.class_id = cls.id
      WHERE cn.id = ?
    `, [id]);

    return notes[0] || null;
  }

  // Get notes by child ID
  static async getByChild(childId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    const [notes] = await pool.execute(`
      SELECT cn.*, u.name as employee_name
      FROM child_notes cn
      JOIN users u ON cn.employee_id = u.id
      WHERE cn.child_id = ?
      ORDER BY cn.created_at DESC
      LIMIT ? OFFSET ?
    `, [childId, limit, offset]);

    const [[{ total }]] = await pool.execute(
      'SELECT COUNT(*) as total FROM child_notes WHERE child_id = ?',
      [childId]
    );

    return {
      notes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Get notes by employee ID
  static async getByEmployee(employeeId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    const [notes] = await pool.execute(`
      SELECT cn.*, c.name as child_name, cls.name as class_name
      FROM child_notes cn
      JOIN children c ON cn.child_id = c.id
      LEFT JOIN classes cls ON c.class_id = cls.id
      WHERE cn.employee_id = ?
      ORDER BY cn.created_at DESC
      LIMIT ? OFFSET ?
    `, [employeeId, limit, offset]);

    const [[{ total }]] = await pool.execute(
      'SELECT COUNT(*) as total FROM child_notes WHERE employee_id = ?',
      [employeeId]
    );

    return {
      notes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Update note
  static async update(id, updateData) {
    const allowedFields = ['category', 'title', 'content'];
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
      `UPDATE child_notes SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  }

  // Delete note
  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM child_notes WHERE id = ?',
      [id]
    );

    return result.affectedRows > 0;
  }
}

module.exports = ChildNote;