import React, { useState, useEffect } from 'react';

const AttendancePage = () => {
  const [children, setChildren] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Mock data - replace with API call
    const mockChildren = [
      { id: 1, name: 'Emma Smith', class: 'Sunshine Class', status: 'present', arrivalTime: '8:15 AM' },
      { id: 2, name: 'Noah Johnson', class: 'Sunshine Class', status: 'present', arrivalTime: '8:30 AM' },
      { id: 3, name: 'Sophia Brown', class: 'Rainbow Class', status: 'absent', arrivalTime: '' },
      { id: 4, name: 'Liam Davis', class: 'Rainbow Class', status: 'present', arrivalTime: '8:05 AM' },
      { id: 5, name: 'Olivia Wilson', class: 'Sunshine Class', status: 'present', arrivalTime: '8:45 AM' },
      { id: 6, name: 'Mason Miller', class: 'Rainbow Class', status: 'present', arrivalTime: '8:20 AM' }
    ];
    setChildren(mockChildren);
  }, [selectedDate]);

  const handleStatusChange = (childId, status) => {
    setChildren(prev => prev.map(child => 
      child.id === childId 
        ? { 
            ...child, 
            status,
            arrivalTime: status === 'present' ? (child.arrivalTime || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})) : ''
          }
        : child
    ));
  };

  const handleSaveAttendance = () => {
    // Save attendance to backend
    alert('Attendance saved successfully!');
  };

  const presentCount = children.filter(child => child.status === 'present').length;
  const absentCount = children.filter(child => child.status === 'absent').length;

  const styles = `
    .attendance-page {
      padding: 2rem 0;
      background: #f8f9fa;
      min-height: calc(100vh - 200px);
    }
    
    .page-header {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
    
    .page-title {
      font-size: 2rem;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    
    .page-subtitle {
      color: #6c757d;
    }
    
    .attendance-controls {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .date-selector {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .date-label {
      font-weight: 600;
      color: #2c3e50;
    }
    
    .date-input {
      padding: 0.5rem;
      border: 2px solid #e9ecef;
      border-radius: 6px;
      font-size: 1rem;
    }
    
    .attendance-stats {
      display: flex;
      gap: 2rem;
    }
    
    .stat {
      text-align: center;
    }
    
    .stat-number {
      font-size: 1.5rem;
      font-weight: 700;
      display: block;
    }
    
    .stat-present { color: #28a745; }
    .stat-absent { color: #dc3545; }
    
    .stat-label {
      font-size: 0.9rem;
      color: #6c757d;
    }
    
    .attendance-list {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .list-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 1rem;
      font-weight: 600;
    }
    
    .attendance-item {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 1rem;
      padding: 1.5rem;
      border-bottom: 1px solid #e9ecef;
      align-items: center;
    }
    
    .attendance-item:last-child {
      border-bottom: none;
    }
    
    .attendance-item:hover {
      background: #f8f9fa;
    }
    
    .child-name {
      font-weight: 600;
      color: #2c3e50;
    }
    
    .child-class {
      color: #6c757d;
      font-size: 0.9rem;
    }
    
    .status-buttons {
      display: flex;
      gap: 0.5rem;
    }
    
    .status-btn {
      padding: 0.5rem 1rem;
      border: 2px solid #e9ecef;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .status-btn.present {
      color: #28a745;
      border-color: #28a745;
    }
    
    .status-btn.present.active {
      background: #28a745;
      color: white;
    }
    
    .status-btn.absent {
      color: #dc3545;
      border-color: #dc3545;
    }
    
    .status-btn.absent.active {
      background: #dc3545;
      color: white;
    }
    
    .arrival-time {
      color: #6c757d;
      font-size: 0.9rem;
    }
    
    .actions-section {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      margin-top: 2rem;
      text-align: center;
    }
    
    .save-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 1rem 3rem;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .save-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    
    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #6c757d;
    }
    
    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.3;
    }
    
    @media (max-width: 768px) {
      .attendance-page {
        padding: 1rem 0;
      }
      
      .page-header {
        padding: 1.5rem;
      }
      
      .attendance-controls {
        flex-direction: column;
        align-items: stretch;
      }
      
      .date-selector {
        justify-content: space-between;
      }
      
      .attendance-stats {
        justify-content: space-around;
      }
      
      .list-header, .attendance-item {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
      
      .list-header {
        display: none;
      }
      
      .attendance-item {
        padding: 1rem;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        margin-bottom: 1rem;
      }
      
      .page-title {
        font-size: 1.5rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="attendance-page">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Daily Attendance</h1>
            <p className="page-subtitle">Mark children present or absent for the day</p>
          </div>

          <div className="attendance-controls">
            <div className="date-selector">
              <span className="date-label">Date:</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
              />
            </div>
            
            <div className="attendance-stats">
              <div className="stat">
                <span className="stat-number stat-present">{presentCount}</span>
                <span className="stat-label">Present</span>
              </div>
              <div className="stat">
                <span className="stat-number stat-absent">{absentCount}</span>
                <span className="stat-label">Absent</span>
              </div>
              <div className="stat">
                <span className="stat-number">{children.length}</span>
                <span className="stat-label">Total</span>
              </div>
            </div>
          </div>

          <div className="attendance-list">
            {children.length > 0 ? (
              <>
                <div className="list-header">
                  <div>Child Name</div>
                  <div>Class</div>
                  <div>Status</div>
                  <div>Arrival Time</div>
                </div>
                
                {children.map(child => (
                  <div key={child.id} className="attendance-item">
                    <div>
                      <div className="child-name">{child.name}</div>
                      <div className="child-class">{child.class}</div>
                    </div>
                    <div>{child.class}</div>
                    <div className="status-buttons">
                      <button
                        className={`status-btn present ${child.status === 'present' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(child.id, 'present')}
                      >
                        Present
                      </button>
                      <button
                        className={`status-btn absent ${child.status === 'absent' ? 'active' : ''}`}
                        onClick={() => handleStatusChange(child.id, 'absent')}
                      >
                        Absent
                      </button>
                    </div>
                    <div className="arrival-time">
                      {child.status === 'present' ? child.arrivalTime : '-'}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">👶</div>
                <h3>No Children Found</h3>
                <p>There are no children enrolled for the selected date.</p>
              </div>
            )}
          </div>

          <div className="actions-section">
            <button onClick={handleSaveAttendance} className="save-btn">
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AttendancePage;