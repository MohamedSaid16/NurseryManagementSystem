const mysql = require('mysql2');
require('dotenv').config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'nursery_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
});

// Convert pool to use promises
const promisePool = pool.promise();

// Test database connection
const testConnection = async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log(' MySQL Database connected successfully');
    connection.release();
    
    // Initialize database tables
    await initializeDatabase();
  } catch (error) {
    console.error(' Database connection failed:', error.message);
    process.exit(1);
  }
};

// Initialize database tables
const initializeDatabase = async () => {
  try {
    // Create tables if they don't exist
    const tables = [
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('parent','employee','admin') NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        emergency_contact VARCHAR(100),
        emergency_phone VARCHAR(20),
        qualifications TEXT,
        position VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,

      `CREATE TABLE IF NOT EXISTS classes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age_group VARCHAR(50),
        capacity INT DEFAULT 12,
        employee_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE SET NULL
      )`,

      `CREATE TABLE IF NOT EXISTS children (
        id INT AUTO_INCREMENT PRIMARY KEY,
        parent_id INT NOT NULL,
        class_id INT,
        name VARCHAR(100) NOT NULL,
        birth_date DATE,
        gender ENUM('male','female','other'),
        allergies TEXT,
        medical_conditions TEXT,
        enrollment_date DATE,
        status ENUM('enrolled','waiting','graduated') DEFAULT 'enrolled',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL
      )`,

      `CREATE TABLE IF NOT EXISTS attendance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        child_id INT NOT NULL,
        date DATE NOT NULL,
        status ENUM('present','absent') NOT NULL,
        arrival_time TIME,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
        UNIQUE KEY unique_attendance (child_id, date)
      )`,

      `CREATE TABLE IF NOT EXISTS activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        child_id INT NOT NULL,
        employee_id INT NOT NULL,
        activity_type ENUM('art','music','outdoor','learning','nap','meal','other') NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        duration VARCHAR(50),
        activity_date DATE DEFAULT CURRENT_DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
        FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE
      )`,

      `CREATE TABLE IF NOT EXISTS child_notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        child_id INT NOT NULL,
        employee_id INT NOT NULL,
        category ENUM('general','behavior','development','health','academic') DEFAULT 'general',
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE,
        FOREIGN KEY (employee_id) REFERENCES users(id) ON DELETE CASCADE
      )`,

      `CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        child_id INT NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        status ENUM('paid','unpaid','overdue') DEFAULT 'unpaid',
        due_date DATE NOT NULL,
        paid_date DATE,
        payment_method VARCHAR(50),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (child_id) REFERENCES children(id) ON DELETE CASCADE
      )`,

      `CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender_id INT NOT NULL,
        receiver_id INT NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
      )`
    ];

    for (const tableQuery of tables) {
      await promisePool.execute(tableQuery);
    }

    // Insert demo data
    await insertDemoData();
    
    console.log(' Database tables initialized successfully');
  } catch (error) {
    console.error(' Error initializing database:', error.message);
  }
};

// Insert demo data
const insertDemoData = async () => {
  try {
    // Check if demo data already exists
    const [users] = await promisePool.execute('SELECT COUNT(*) as count FROM users');
    if (users[0].count > 0) return;

    console.log(' Inserting demo data...');

    // Insert demo users
    const demoUsers = [
      ['Admin User', 'admin@demo.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '+1 (555) 111-1111', '123 Admin St', 'Emergency Admin', '+1 (555) 999-9999', 'MBA, Child Development', 'Director'],
      ['John Parent', 'parent@demo.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'parent', '+1 (555) 222-2222', '456 Parent Ave', 'Jane Parent', '+1 (555) 888-8888', null, null],
      ['Jane Teacher', 'employee@demo.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'employee', '+1 (555) 333-3333', '789 Teacher Blvd', 'Mike Teacher', '+1 (555) 777-7777', 'BA Early Childhood Education, CPR Certified', 'Lead Teacher']
    ];

    for (const user of demoUsers) {
      await promisePool.execute(
        'INSERT IGNORE INTO users (name, email, password, role, phone, address, emergency_contact, emergency_phone, qualifications, position) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        user
      );
    }

    // Insert demo classes
    const [admin] = await promisePool.execute('SELECT id FROM users WHERE role = "admin" LIMIT 1');
    const adminId = admin[0]?.id;

    const demoClasses = [
      ['Sunshine Class', '3-4 years', 12, adminId],
      ['Rainbow Class', '4-5 years', 12, adminId]
    ];

    for (const classData of demoClasses) {
      await promisePool.execute(
        'INSERT IGNORE INTO classes (name, age_group, capacity, employee_id) VALUES (?, ?, ?, ?)',
        classData
      );
    }

    // Insert demo children
    const [parent] = await promisePool.execute('SELECT id FROM users WHERE role = "parent" LIMIT 1');
    const [classes] = await promisePool.execute('SELECT id FROM classes');
    
    if (parent[0] && classes.length > 0) {
      const demoChildren = [
        [parent[0].id, classes[0].id, 'Emma Smith', '2020-05-15', 'female', 'None', 'None', '2023-09-01'],
        [parent[0].id, classes[1].id, 'Noah Smith', '2019-08-22', 'male', 'Peanuts', 'Asthma', '2023-09-01']
      ];

      for (const child of demoChildren) {
        await promisePool.execute(
          'INSERT IGNORE INTO children (parent_id, class_id, name, birth_date, gender, allergies, medical_conditions, enrollment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          child
        );
      }
    }

    console.log(' Demo data inserted successfully');
  } catch (error) {
    console.error(' Error inserting demo data:', error.message);
  }
};

module.exports = {
  pool: promisePool,
  testConnection
};