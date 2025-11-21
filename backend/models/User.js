const { pool } = require('../config/db');
const { hashPassword, comparePassword, generateRandomPassword } = require('../utils/helpers');

class User {
  // Create new user
  static async create(userData) {
    const {
      name,
      email,
      password,
      role,
      phone = null,
      address = null,
      emergency_contact = null,
      emergency_phone = null,
      qualifications = null,
      position = null
    } = userData;

    const hashedPassword = await hashPassword(password || generateRandomPassword());

    const [result] = await pool.execute(
      `INSERT INTO users (name, email, password, role, phone, address, emergency_contact, emergency_phone, qualifications, position) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, role, phone, address, emergency_contact, emergency_phone, qualifications, position]
    );

    return result.insertId;
  }

  // Find user by email
  static async findByEmail(email) {
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return users[0] || null;
  }

  // Find user by ID
  static async findById(id) {
    const [users] = await pool.execute(
      'SELECT id, name, email, role, phone, address, emergency_contact, emergency_phone, qualifications, position, created_at FROM users WHERE id = ?',
      [id]
    );
    return users[0] || null;
  }

  // Update user
  static async update(id, updateData) {
    const allowedFields = ['name', 'phone', 'address', 'emergency_contact', 'emergency_phone', 'qualifications', 'position'];
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
      `UPDATE users SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  }

  // Change password
  static async changePassword(id, newPassword) {
    const hashedPassword = await hashPassword(newPassword);
    
    const [result] = await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );

    return result.affectedRows > 0;
  }

  // Verify password
  static async verifyPassword(email, password) {
    const user = await this.findByEmail(email);
    if (!user) return false;

    return await comparePassword(password, user.password);
  }

  // Get all users by role
  static async getByRole(role, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    const [users] = await pool.execute(
      'SELECT id, name, email, role, phone, address, emergency_contact, emergency_phone, qualifications, position, created_at FROM users WHERE role = ? LIMIT ? OFFSET ?',
      [role, limit, offset]
    );

    const [[{ total }]] = await pool.execute(
      'SELECT COUNT(*) as total FROM users WHERE role = ?',
      [role]
    );

    return {
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Delete user
  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM users WHERE id = ? AND role != "admin"',
      [id]
    );

    return result.affectedRows > 0;
  }

  // Get user statistics
  static async getStats() {
    const [[userStats]] = await pool.execute(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN role = 'parent' THEN 1 END) as total_parents,
        COUNT(CASE WHEN role = 'employee' THEN 1 END) as total_employees,
        COUNT(CASE WHEN role = 'admin' THEN 1 END) as total_admins
      FROM users
    `);

    return userStats;
  }
}

module.exports = User;