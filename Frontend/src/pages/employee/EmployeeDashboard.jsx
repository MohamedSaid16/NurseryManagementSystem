import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [dashboardStats, setDashboardStats] = useState({
    totalChildren: 48,
    totalEmployees: 8,
    totalParents: 42,
    attendanceRate: 92,
    revenue: 12540,
    upcomingEvents: 3
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Update current time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);

    // Simulate API call
    setTimeout(() => {
      setRecentActivity([
        { id: 1, type: 'registration', description: 'New child registration - Liam Chen', time: '2 hours ago' },
        { id: 2, type: 'payment', description: 'Payment received from Johnson family', time: '4 hours ago' },
        { id: 3, type: 'attendance', description: 'Daily attendance marked for all classes', time: '6 hours ago' },
        { id: 4, type: 'employee', description: 'New employee account created', time: '1 day ago' }
      ]);
      setLoading(false);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const styles = `
    .admin-dashboard {
      padding: 2rem 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      position: relative;
      overflow-x: hidden;
    }
    
    .admin-dashboard::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
      pointer-events: none;
    }
    
    .dashboard-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 2rem;
      position: relative;
      z-index: 1;
    }
    
    .dashboard-header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      padding: 2.5rem;
      border-radius: 24px;
      box-shadow: 
        0 20px 40px rgba(0,0,0,0.1),
        0 0 0 1px rgba(255, 255, 255, 0.2);
      margin-bottom: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    
    .dashboard-header:hover {
      box-shadow: 
        0 25px 50px rgba(0,0,0,0.15),
        0 0 0 1px rgba(255, 255, 255, 0.3);
    }
    
    .dashboard-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
      background-size: 200% 100%;
      animation: shimmer 3s ease-in-out infinite;
    }
    
    @keyframes shimmer {
      0%, 100% { background-position: -200% 0; }
      50% { background-position: 200% 0; }
    }
    
    .welcome-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .welcome-text {
      flex: 1;
    }
    
    .welcome-message {
      font-size: 2.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
      font-weight: 800;
      line-height: 1.2;
    }
    
    .welcome-subtitle {
      color: #6c757d;
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .current-time {
      color: #8c9eff;
      font-size: 1rem;
      font-weight: 600;
      background: rgba(102, 126, 234, 0.1);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      display: inline-block;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .stat-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      padding: 2rem;
      border-radius: 20px;
      box-shadow: 
        0 10px 30px rgba(0,0,0,0.1),
        0 0 0 1px rgba(255, 255, 255, 0.2);
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    
    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--card-color), transparent);
      transition: all 0.4s ease;
    }
    
    .stat-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.6s ease;
    }
    
    .stat-card:hover::after {
      left: 100%;
    }
    
    .stat-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 
        0 25px 50px rgba(0,0,0,0.15),
        0 0 0 1px rgba(255, 255, 255, 0.3);
    }
    
    .stat-card.children { --card-color: #667eea; }
    .stat-card.employees { --card-color: #f093fb; }
    .stat-card.parents { --card-color: #4facfe; }
    .stat-card.attendance { --card-color: #43e97b; }
    .stat-card.revenue { --card-color: #ff9a9e; }
    .stat-card.events { --card-color: #a8edea; }
    
    .stat-icon {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      filter: drop-shadow(0 6px 12px rgba(0,0,0,0.15));
      transition: transform 0.3s ease;
    }
    
    .stat-card:hover .stat-icon {
      transform: scale(1.1) rotate(5deg);
    }
    
    .stat-number {
      font-size: 2.8rem;
      font-weight: 900;
      background: linear-gradient(135deg, var(--card-color), #2c3e50);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
      text-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .stat-label {
      color: #6c757d;
      font-weight: 700;
      font-size: 1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .quick-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
      margin: 3rem 0;
    }
    
    .action-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      padding: 2.5rem 2rem;
      border-radius: 20px;
      text-align: center;
      text-decoration: none;
      color: inherit;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 
        0 10px 30px rgba(0,0,0,0.1),
        0 0 0 1px rgba(255, 255, 255, 0.2);
      position: relative;
      overflow: hidden;
    }
    
    .action-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.05));
      transition: left 0.4s ease;
    }
    
    .action-card:hover::before {
      left: 0;
    }
    
    .action-card:hover {
      transform: translateY(-8px) scale(1.03);
      box-shadow: 
        0 25px 50px rgba(0,0,0,0.15),
        0 0 0 1px rgba(102, 126, 234, 0.3);
    }
    
    .action-icon {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      filter: drop-shadow(0 6px 12px rgba(0,0,0,0.15));
      transition: all 0.4s ease;
    }
    
    .action-card:hover .action-icon {
      transform: scale(1.15) translateY(-5px);
      filter: drop-shadow(0 8px 16px rgba(0,0,0,0.2));
    }
    
    .action-title {
      font-size: 1.4rem;
      font-weight: 800;
      color: #2c3e50;
      margin-bottom: 0.75rem;
      position: relative;
    }
    
    .action-description {
      color: #6c757d;
      font-size: 1rem;
      line-height: 1.5;
      font-weight: 500;
    }
    
    .dashboard-sections {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
      margin-bottom: 2rem;
    }
    
    .section-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      box-shadow: 
        0 10px 30px rgba(0,0,0,0.1),
        0 0 0 1px rgba(255, 255, 255, 0.2);
      padding: 2.5rem;
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
    }
    
    .section-card:hover {
      box-shadow: 
        0 20px 40px rgba(0,0,0,0.15),
        0 0 0 1px rgba(255, 255, 255, 0.3);
    }
    
    .section-title {
      font-size: 1.6rem;
      color: #2c3e50;
      margin-bottom: 2rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-bottom: 1.5rem;
      border-bottom: 3px solid rgba(102, 126, 234, 0.2);
    }
    
    .section-title span {
      font-size: 2rem;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
    }
    
    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .activity-item {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      background: rgba(248, 249, 250, 0.8);
      border-radius: 16px;
      transition: all 0.3s ease;
      border: 1px solid transparent;
      position: relative;
      overflow: hidden;
    }
    
    .activity-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: var(--activity-color);
      transition: width 0.3s ease;
    }
    
    .activity-item:hover::before {
      width: 8px;
    }
    
    .activity-item:hover {
      background: rgba(102, 126, 234, 0.05);
      border-color: rgba(102, 126, 234, 0.2);
      transform: translateX(8px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    }
    
    .activity-icon {
      width: 60px;
      height: 60px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1.5rem;
      font-size: 1.6rem;
      flex-shrink: 0;
      box-shadow: 0 6px 12px rgba(0,0,0,0.15);
      transition: all 0.3s ease;
    }
    
    .activity-item:hover .activity-icon {
      transform: scale(1.1);
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }
    
    .icon-registration { 
      background: linear-gradient(135deg, #667eea, #764ba2); 
      color: white;
      --activity-color: #667eea;
    }
    .icon-payment { 
      background: linear-gradient(135deg, #43e97b, #38f9d7); 
      color: white;
      --activity-color: #43e97b;
    }
    .icon-attendance { 
      background: linear-gradient(135deg, #ff9a9e, #fecfef); 
      color: white;
      --activity-color: #ff9a9e;
    }
    .icon-employee { 
      background: linear-gradient(135deg, #a8edea, #fed6e3); 
      color: #2c3e50;
      --activity-color: #a8edea;
    }
    
    .activity-details {
      flex: 1;
    }
    
    .activity-description {
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
    
    .activity-time {
      color: #6c757d;
      font-size: 0.9rem;
      font-weight: 600;
    }
    
    .upcoming-events {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .event-item {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      background: rgba(248, 249, 250, 0.8);
      border-radius: 16px;
      transition: all 0.3s ease;
      border: 1px solid transparent;
      position: relative;
      overflow: hidden;
    }
    
    .event-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      transition: width 0.3s ease;
    }
    
    .event-item:hover::before {
      width: 8px;
    }
    
    .event-item:hover {
      background: rgba(102, 126, 234, 0.05);
      border-color: rgba(102, 126, 234, 0.2);
      transform: translateX(5px);
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    }
    
    .event-date {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 1rem 1.25rem;
      border-radius: 14px;
      text-align: center;
      min-width: 80px;
      margin-right: 1.5rem;
      flex-shrink: 0;
      box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3);
      transition: all 0.3s ease;
    }
    
    .event-item:hover .event-date {
      transform: scale(1.05);
      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
    }
    
    .event-day {
      font-size: 1.6rem;
      font-weight: 900;
      display: block;
      line-height: 1;
    }
    
    .event-month {
      font-size: 0.85rem;
      text-transform: uppercase;
      font-weight: 700;
      opacity: 0.9;
      letter-spacing: 1px;
    }
    
    .event-details {
      flex: 1;
    }
    
    .event-title {
      font-weight: 800;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }
    
    .event-time {
      color: #6c757d;
      font-size: 0.95rem;
      font-weight: 600;
    }
    
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #6c757d;
    }
    
    .empty-icon {
      font-size: 5rem;
      margin-bottom: 1.5rem;
      opacity: 0.6;
      filter: drop-shadow(0 6px 12px rgba(0,0,0,0.15));
    }
    
    .loading-spinner {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 6rem;
      flex-direction: column;
      gap: 2rem;
    }
    
    .spinner {
      width: 60px;
      height: 60px;
      border: 4px solid rgba(102, 126, 234, 0.2);
      border-left: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    .loading-text {
      color: white;
      font-size: 1.2rem;
      font-weight: 600;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @media (max-width: 1024px) {
      .dashboard-sections {
        grid-template-columns: 1fr;
      }
      
      .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      }
      
      .welcome-section {
        flex-direction: column;
        gap: 1rem;
      }
    }
    
    @media (max-width: 768px) {
      .admin-dashboard {
        padding: 1rem 0;
      }
      
      .dashboard-container {
        padding: 0 1rem;
      }
      
      .dashboard-header {
        padding: 2rem 1.5rem;
      }
      
      .welcome-message {
        font-size: 2rem;
      }
      
      .quick-actions {
        grid-template-columns: 1fr;
      }
      
      .stat-card {
        padding: 1.5rem;
      }
      
      .section-card {
        padding: 2rem 1.5rem;
      }
      
      .action-card {
        padding: 2rem 1.5rem;
      }
    }
  `;

  const upcomingEvents = [
    { id: 1, title: 'Parent-Teacher Conference', date: '2024-01-20', time: '3:00 PM - 6:00 PM' },
    { id: 2, title: 'Staff Training', date: '2024-01-22', time: '9:00 AM - 12:00 PM' },
    { id: 3, title: 'Field Trip - Zoo', date: '2024-01-25', time: '8:00 AM - 2:00 PM' }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en', { month: 'short' })
    };
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="admin-dashboard">
          <div className="dashboard-container">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <div className="loading-text">Loading Dashboard...</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="admin-dashboard">
        <div className="dashboard-container">
          {/* Header */}
          <div className="dashboard-header">
            <div className="welcome-section">
              <div className="welcome-text">
                <h1 className="welcome-message">Welcome back, {user?.name}! 👋</h1>
                <p className="welcome-subtitle">Here's what's happening at your daycare today</p>
                <div className="current-time">{currentTime}</div>
              </div>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="stats-grid">
            <div className="stat-card children">
              <div className="stat-icon">👶</div>
              <div className="stat-number">{dashboardStats.totalChildren}</div>
              <div className="stat-label">Total Children</div>
            </div>
            <div className="stat-card employees">
              <div className="stat-icon">👥</div>
              <div className="stat-number">{dashboardStats.totalEmployees}</div>
              <div className="stat-label">Employees</div>
            </div>
            <div className="stat-card parents">
              <div className="stat-icon">👨‍👩‍👧‍👦</div>
              <div className="stat-number">{dashboardStats.totalParents}</div>
              <div className="stat-label">Parents</div>
            </div>
            <div className="stat-card attendance">
              <div className="stat-icon">✅</div>
              <div className="stat-number">{dashboardStats.attendanceRate}%</div>
              <div className="stat-label">Attendance Rate</div>
            </div>
            <div className="stat-card revenue">
              <div className="stat-icon">💰</div>
              <div className="stat-number">${dashboardStats.revenue.toLocaleString()}</div>
              <div className="stat-label">Monthly Revenue</div>
            </div>
            <div className="stat-card events">
              <div className="stat-icon">📅</div>
              <div className="stat-number">{dashboardStats.upcomingEvents}</div>
              <div className="stat-label">Upcoming Events</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <Link to="/admin/manage-parents" className="action-card">
              <div className="action-icon">👨‍👩‍👧‍👦</div>
              <div className="action-title">Manage Parents</div>
              <div className="action-description">View and manage parent accounts and communications</div>
            </Link>
            
            <Link to="/admin/manage-employees" className="action-card">
              <div className="action-icon">👥</div>
              <div className="action-title">Manage Employees</div>
              <div className="action-description">Staff management, roles, and schedules</div>
            </Link>
            
            <Link to="/admin/manage-children" className="action-card">
              <div className="action-icon">👶</div>
              <div className="action-title">Manage Children</div>
              <div className="action-description">Child records, enrollment, and progress</div>
            </Link>
            
            <Link to="/admin/manage-payments" className="action-card">
              <div className="action-icon">💰</div>
              <div className="action-title">Manage Payments</div>
              <div className="action-description">Payment tracking, invoices, and financial reports</div>
            </Link>
            
            <Link to="/admin/manage-classes" className="action-card">
              <div className="action-icon">🏫</div>
              <div className="action-title">Manage Classes</div>
              <div className="action-description">Class setup, assignments, and curriculum</div>
            </Link>
            
            <Link to="/admin/reports" className="action-card">
              <div className="action-icon">📊</div>
              <div className="action-title">View Reports</div>
              <div className="action-description">Analytics, insights, and performance metrics</div>
            </Link>
          </div>

          {/* Main Content Sections */}
          <div className="dashboard-sections">
            {/* Recent Activity */}
            <div className="section-card">
              <h3 className="section-title">
                <span>🔄</span>
                Recent Activity
              </h3>
              <div className="activity-list">
                {recentActivity.length > 0 ? (
                  recentActivity.map(activity => (
                    <div key={activity.id} className="activity-item">
                      <div className={`activity-icon icon-${activity.type}`}>
                        {activity.type === 'registration' ? '📝' :
                         activity.type === 'payment' ? '💰' :
                         activity.type === 'attendance' ? '✅' : '👥'}
                      </div>
                      <div className="activity-details">
                        <div className="activity-description">{activity.description}</div>
                        <div className="activity-time">{activity.time}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">📝</div>
                    <p>No recent activity</p>
                  </div>
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="section-card">
              <h3 className="section-title">
                <span>📅</span>
                Upcoming Events
              </h3>
              <div className="upcoming-events">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map(event => {
                    const { day, month } = formatDate(event.date);
                    return (
                      <div key={event.id} className="event-item">
                        <div className="event-date">
                          <span className="event-day">{day}</span>
                          <span className="event-month">{month}</span>
                        </div>
                        <div className="event-details">
                          <div className="event-title">{event.title}</div>
                          <div className="event-time">{event.time}</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">📅</div>
                    <p>No upcoming events</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;