const { pool } = require('../config/db');
const { calculateAge } = require('../utils/helpers');

class Child {
  // Create new child
  static async create(childData) {
    const {
      parent_id,
      class_id = null,
      name,
      birth_date,
      gender,
      allergies = null,
      medical_conditions = null
    } = childData;

    const [result] = await pool.execute(
      `INSERT INTO children (parent_id, class_id, name, birth_date, gender, allergies, medical_conditions, enrollment_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())`,
      [parent_id, class_id, name, birth_date, gender, allergies, medical_conditions]
    );

    return result.insertId;
  }

  // Find child by ID
  static async findById(id) {
    const [children] = await pool.execute(`
      SELECT c.*, u.name as parent_name, u.email as parent_email, u.phone as parent_phone,
             cls.name as class_name, cls.age_group
      FROM children c
      LEFT JOIN users u ON c.parent_id = u.id
      LEFT JOIN classes cls ON c.class_id = cls.id
      WHERE c.id = ?
    `, [id]);

    const child = children[0];
    if (child) {
      child.age = calculateAge(child.birth_date);
    }
    return child || null;
  }

  // Get children by parent ID
  static async findByParentId(parentId) {
    const [children] = await pool.execute(`
      SELECT c.*, cls.name as class_name, cls.age_group
      FROM children c
      LEFT JOIN classes cls ON c.class_id = cls.id
      WHERE c.parent_id = ? AND c.status = 'enrolled'
      ORDER BY c.name
    `, [parentId]);

    // Calculate age for each child
    return children.map(child => ({
      ...child,
      age: calculateAge(child.birth_date)
    }));
  }

  // Get all children with pagination
  static async getAll(page = 1, limit = 10, filters = {}) {
    let query = `
      SELECT c.*, u.name as parent_name, u.phone as parent_phone,
             cls.name as class_name, cls.age_group
      FROM children c
      LEFT JOIN users u ON c.parent_id = u.id
      LEFT JOIN classes cls ON c.class_id = cls.id
      WHERE 1=1
    `;
    const values = [];

    // Apply filters
    if (filters.class_id) {
      query += ' AND c.class_id = ?';
      values.push(filters.class_id);
    }

    if (filters.status) {
      query += ' AND c.status = ?';
      values.push(filters.status);
    }

    if (filters.search) {
      query += ' AND (c.name LIKE ? OR u.name LIKE ?)';
      values.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    // Add pagination
    const offset = (page - 1) * limit;
    query += ' ORDER BY c.name LIMIT ? OFFSET ?';
    values.push(limit, offset);

    const [children] = await pool.execute(query, values);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM children c LEFT JOIN users u ON c.parent_id = u.id WHERE 1=1';
    const countValues = [];

    if (filters.class_id) {
      countQuery += ' AND c.class_id = ?';
      countValues.push(filters.class_id);
    }

    if (filters.status) {
      countQuery += ' AND c.status = ?';
      countValues.push(filters.status);
    }

    if (filters.search) {
      countQuery += ' AND (c.name LIKE ? OR u.name LIKE ?)';
      countValues.push(`%${filters.search}%`, `%${filters.search}%`);
    }

    const [[{ total }]] = await pool.execute(countQuery, countValues);

    // Calculate age for each child
    const childrenWithAge = children.map(child => ({
      ...child,
      age: calculateAge(child.birth_date)
    }));

    return {
      children: childrenWithAge,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Update child
  static async update(id, updateData) {
    const allowedFields = ['class_id', 'name', 'birth_date', 'gender', 'allergies', 'medical_conditions', 'status'];
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
      `UPDATE children SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  }

  // Delete child (soft delete by changing status)
  static async delete(id) {
    const [result] = await pool.execute(
      'UPDATE children SET status = "graduated" WHERE id = ?',
      [id]
    );

    return result.affectedRows > 0;
  }

  // Get child statistics
  static async getStats() {
    const [[childStats]] = await pool.execute(`
      SELECT 
        COUNT(*) as total_children,
        COUNT(CASE WHEN status = 'enrolled' THEN 1 END) as enrolled_children,
        COUNT(CASE WHEN status = 'waiting' THEN 1 END) as waiting_children,
        COUNT(CASE WHEN status = 'graduated' THEN 1 END) as graduated_children,
        COUNT(CASE WHEN gender = 'male' THEN 1 END) as male_children,
        COUNT(CASE WHEN gender = 'female' THEN 1 END) as female_children
      FROM children
    `);

    return childStats;
  }

  // Get children by class
  static async getByClass(classId) {
    const [children] = await pool.execute(`
      SELECT c.*, u.name as parent_name, u.phone as parent_phone
      FROM children c
      LEFT JOIN users u ON c.parent_id = u.id
      WHERE c.class_id = ? AND c.status = 'enrolled'
      ORDER BY c.name
    `, [classId]);

    return children.map(child => ({
      ...child,
      age: calculateAge(child.birth_date)
    }));
  }
}

module.exports = Child;