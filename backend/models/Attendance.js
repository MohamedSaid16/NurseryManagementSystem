const { pool } = require('../config/db');

class Attendance {
  // Mark attendance
  static async mark(attendanceData) {
    const { child_id, date, status, arrival_time = null, notes = null } = attendanceData;

    // Check if attendance already exists for this child and date
    const [existing] = await pool.execute(
      'SELECT id FROM attendance WHERE child_id = ? AND date = ?',
      [child_id, date]
    );

    if (existing.length > 0) {
      // Update existing attendance
      const [result] = await pool.execute(
        'UPDATE attendance SET status = ?, arrival_time = ?, notes = ? WHERE child_id = ? AND date = ?',
        [status, arrival_time, notes, child_id, date]
      );
      return result.affectedRows > 0;
    } else {
      // Create new attendance record
      const [result] = await pool.execute(
        'INSERT INTO attendance (child_id, date, status, arrival_time, notes) VALUES (?, ?, ?, ?, ?)',
        [child_id, date, status, arrival_time, notes]
      );
      return result.insertId;
    }
  }

  // Mark multiple attendances
  static async markMultiple(attendances) {
    const results = [];
    
    for (const attendance of attendances) {
      try {
        const result = await this.mark(attendance);
        results.push({
          child_id: attendance.child_id,
          success: true,
          result
        });
      } catch (error) {
        results.push({
          child_id: attendance.child_id,
          success: false,
          error: error.message
        });
      }
    }
    
    return results;
  }

  // Get attendance by child and date range
  static async getByChild(childId, startDate, endDate) {
    const [attendance] = await pool.execute(`
      SELECT a.*, c.name as child_name
      FROM attendance a
      JOIN children c ON a.child_id = c.id
      WHERE a.child_id = ? AND a.date BETWEEN ? AND ?
      ORDER BY a.date DESC
    `, [childId, startDate, endDate]);

    return attendance;
  }

  // Get attendance by date
  static async getByDate(date, classId = null) {
    let query = `
      SELECT a.*, c.name as child_name, c.class_id, cls.name as class_name,
             u.name as parent_name
      FROM attendance a
      JOIN children c ON a.child_id = c.id
      LEFT JOIN classes cls ON c.class_id = cls.id
      LEFT JOIN users u ON c.parent_id = u.id
      WHERE a.date = ?
    `;
    const values = [date];

    if (classId) {
      query += ' AND c.class_id = ?';
      values.push(classId);
    }

    query += ' ORDER BY c.name';

    const [attendance] = await pool.execute(query, values);
    return attendance;
  }

  // Get attendance statistics
  static async getStats(startDate, endDate) {
    const [stats] = await pool.execute(`
      SELECT 
        date,
        COUNT(*) as total_children,
        COUNT(CASE WHEN status = 'present' THEN 1 END) as present_count,
        COUNT(CASE WHEN status = 'absent' THEN 1 END) as absent_count,
        ROUND((COUNT(CASE WHEN status = 'present' THEN 1 END) * 100.0 / COUNT(*)), 2) as attendance_rate
      FROM attendance 
      WHERE date BETWEEN ? AND ?
      GROUP BY date
      ORDER BY date
    `, [startDate, endDate]);

    return stats;
  }

  // Get child attendance summary
  static async getChildSummary(childId) {
    const [[summary]] = await pool.execute(`
      SELECT 
        COUNT(*) as total_days,
        COUNT(CASE WHEN status = 'present' THEN 1 END) as present_days,
        COUNT(CASE WHEN status = 'absent' THEN 1 END) as absent_days,
        ROUND((COUNT(CASE WHEN status = 'present' THEN 1 END) * 100.0 / COUNT(*)), 2) as attendance_rate
      FROM attendance 
      WHERE child_id = ?
    `, [childId]);

    return summary;
  }

  // Get monthly attendance report
  static async getMonthlyReport(year, month) {
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
    const endDate = `${year}-${month.toString().padStart(2, '0')}-31`;

    const [report] = await pool.execute(`
      SELECT 
        c.id as child_id,
        c.name as child_name,
        cls.name as class_name,
        COUNT(a.id) as school_days,
        COUNT(CASE WHEN a.status = 'present' THEN 1 END) as present_days,
        COUNT(CASE WHEN a.status = 'absent' THEN 1 END) as absent_days,
        ROUND((COUNT(CASE WHEN a.status = 'present' THEN 1 END) * 100.0 / COUNT(a.id)), 2) as attendance_rate
      FROM children c
      LEFT JOIN classes cls ON c.class_id = cls.id
      LEFT JOIN attendance a ON c.id = a.child_id AND a.date BETWEEN ? AND ?
      WHERE c.status = 'enrolled'
      GROUP BY c.id, c.name, cls.name
      ORDER BY cls.name, c.name
    `, [startDate, endDate]);

    return report;
  }
}

module.exports = Attendance;