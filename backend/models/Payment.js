const { pool } = require('../config/db');
const { formatCurrency } = require('../utils/helpers');

class Payment {
  // Create new payment record
  static async create(paymentData) {
    const {
      child_id,
      amount,
      due_date,
      status = 'unpaid',
      paid_date = null,
      payment_method = null,
      notes = null
    } = paymentData;

    const [result] = await pool.execute(
      `INSERT INTO payments (child_id, amount, due_date, status, paid_date, payment_method, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [child_id, amount, due_date, status, paid_date, payment_method, notes]
    );

    return result.insertId;
  }

  // Find payment by ID
  static async findById(id) {
    const [payments] = await pool.execute(`
      SELECT p.*, c.name as child_name, u.name as parent_name, u.email as parent_email,
             u.phone as parent_phone, cls.name as class_name
      FROM payments p
      JOIN children c ON p.child_id = c.id
      JOIN users u ON c.parent_id = u.id
      LEFT JOIN classes cls ON c.class_id = cls.id
      WHERE p.id = ?
    `, [id]);

    const payment = payments[0];
    if (payment) {
      payment.amount_formatted = formatCurrency(payment.amount);
    }
    return payment || null;
  }

  // Get payments by child ID
  static async getByChild(childId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    const [payments] = await pool.execute(`
      SELECT p.*
      FROM payments p
      WHERE p.child_id = ?
      ORDER BY p.due_date DESC
      LIMIT ? OFFSET ?
    `, [childId, limit, offset]);

    // Format amounts
    const formattedPayments = payments.map(payment => ({
      ...payment,
      amount_formatted: formatCurrency(payment.amount)
    }));

    const [[{ total }]] = await pool.execute(
      'SELECT COUNT(*) as total FROM payments WHERE child_id = ?',
      [childId]
    );

    return {
      payments: formattedPayments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Get payments by parent ID
  static async getByParent(parentId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    
    const [payments] = await pool.execute(`
      SELECT p.*, c.name as child_name, cls.name as class_name
      FROM payments p
      JOIN children c ON p.child_id = c.id
      LEFT JOIN classes cls ON c.class_id = cls.id
      WHERE c.parent_id = ?
      ORDER BY p.due_date DESC
      LIMIT ? OFFSET ?
    `, [parentId, limit, offset]);

    // Format amounts
    const formattedPayments = payments.map(payment => ({
      ...payment,
      amount_formatted: formatCurrency(payment.amount)
    }));

    const [[{ total }]] = await pool.execute(`
      SELECT COUNT(*) as total 
      FROM payments p
      JOIN children c ON p.child_id = c.id
      WHERE c.parent_id = ?
    `, [parentId]);

    return {
      payments: formattedPayments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Get all payments with filters
  static async getAll(page = 1, limit = 10, filters = {}) {
    let query = `
      SELECT p.*, c.name as child_name, u.name as parent_name, cls.name as class_name
      FROM payments p
      JOIN children c ON p.child_id = c.id
      JOIN users u ON c.parent_id = u.id
      LEFT JOIN classes cls ON c.class_id = cls.id
      WHERE 1=1
    `;
    const values = [];

    // Apply filters
    if (filters.status) {
      query += ' AND p.status = ?';
      values.push(filters.status);
    }

    if (filters.child_id) {
      query += ' AND p.child_id = ?';
      values.push(filters.child_id);
    }

    if (filters.parent_id) {
      query += ' AND c.parent_id = ?';
      values.push(filters.parent_id);
    }

    if (filters.start_date) {
      query += ' AND p.due_date >= ?';
      values.push(filters.start_date);
    }

    if (filters.end_date) {
      query += ' AND p.due_date <= ?';
      values.push(filters.end_date);
    }

    // Add pagination
    const offset = (page - 1) * limit;
    query += ' ORDER BY p.due_date DESC LIMIT ? OFFSET ?';
    values.push(limit, offset);

    const [payments] = await pool.execute(query, values);

    // Format amounts
    const formattedPayments = payments.map(payment => ({
      ...payment,
      amount_formatted: formatCurrency(payment.amount)
    }));

    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM payments p
      JOIN children c ON p.child_id = c.id
      WHERE 1=1
    `;
    const countValues = [];

    if (filters.status) {
      countQuery += ' AND p.status = ?';
      countValues.push(filters.status);
    }

    if (filters.child_id) {
      countQuery += ' AND p.child_id = ?';
      countValues.push(filters.child_id);
    }

    if (filters.parent_id) {
      countQuery += ' AND c.parent_id = ?';
      countValues.push(filters.parent_id);
    }

    if (filters.start_date) {
      countQuery += ' AND p.due_date >= ?';
      countValues.push(filters.start_date);
    }

    if (filters.end_date) {
      countQuery += ' AND p.due_date <= ?';
      countValues.push(filters.end_date);
    }

    const [[{ total }]] = await pool.execute(countQuery, countValues);

    return {
      payments: formattedPayments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Update payment
  static async update(id, updateData) {
    const allowedFields = ['amount', 'due_date', 'status', 'paid_date', 'payment_method', 'notes'];
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
      `UPDATE payments SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  }

  // Mark payment as paid
  static async markAsPaid(id, paymentMethod = null) {
    const [result] = await pool.execute(
      'UPDATE payments SET status = "paid", paid_date = CURDATE(), payment_method = ? WHERE id = ?',
      [paymentMethod, id]
    );

    return result.affectedRows > 0;
  }

  // Delete payment
  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM payments WHERE id = ?',
      [id]
    );

    return result.affectedRows > 0;
  }

  // Get payment statistics
  static async getStats() {
    const [[stats]] = await pool.execute(`
      SELECT 
        COUNT(*) as total_payments,
        COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid_payments,
        COUNT(CASE WHEN status = 'unpaid' THEN 1 END) as unpaid_payments,
        COUNT(CASE WHEN status = 'overdue' THEN 1 END) as overdue_payments,
        COALESCE(SUM(CASE WHEN status = 'paid' THEN amount END), 0) as total_revenue,
        COALESCE(SUM(CASE WHEN status = 'unpaid' THEN amount END), 0) as pending_revenue,
        COALESCE(SUM(CASE WHEN status = 'overdue' THEN amount END), 0) as overdue_revenue
      FROM payments
    `);

    // Format currency values
    stats.total_revenue_formatted = formatCurrency(stats.total_revenue);
    stats.pending_revenue_formatted = formatCurrency(stats.pending_revenue);
    stats.overdue_revenue_formatted = formatCurrency(stats.overdue_revenue);

    return stats;
  }

  // Get overdue payments
  static async getOverduePayments() {
    const [payments] = await pool.execute(`
      SELECT p.*, c.name as child_name, u.name as parent_name, u.email as parent_email,
             u.phone as parent_phone, DATEDIFF(CURDATE(), p.due_date) as days_overdue
      FROM payments p
      JOIN children c ON p.child_id = c.id
      JOIN users u ON c.parent_id = u.id
      WHERE p.status IN ('unpaid', 'overdue') AND p.due_date < CURDATE()
      ORDER BY p.due_date ASC
    `);

    // Format amounts and calculate overdue status
    return payments.map(payment => ({
      ...payment,
      amount_formatted: formatCurrency(payment.amount),
      status: payment.days_overdue > 0 ? 'overdue' : payment.status
    }));
  }
}

module.exports = Payment;