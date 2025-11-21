import React, { useState, useEffect } from 'react';

const TrackChild = () => {
  const [selectedChild, setSelectedChild] = useState('');
  const [activities, setActivities] = useState([]);
  const [children] = useState([
    { id: 1, name: 'Emma Smith' },
    { id: 2, name: 'Noah Smith' }
  ]);

  useEffect(() => {
    if (selectedChild) {
      // Mock data - replace with API call
      setActivities([
        { id: 1, time: '08:00 AM', activity: 'Arrival & Breakfast', type: 'meal' },
        { id: 2, time: '09:00 AM', activity: 'Circle Time', type: 'learning' },
        { id: 3, time: '10:00 AM', activity: 'Art Project', type: 'creative' },
        { id: 4, time: '11:30 AM', activity: 'Outdoor Play', type: 'physical' },
        { id: 5, time: '12:30 PM', activity: 'Lunch', type: 'meal' },
        { id: 6, time: '01:30 PM', activity: 'Nap Time', type: 'rest' }
      ]);
    }
  }, [selectedChild]);

  const styles = `
    .track-child {
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
    
    .child-selector {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      margin-bottom: 2rem;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #2c3e50;
    }
    
    .form-select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 1rem;
      background: white;
    }
    
    .form-select:focus {
      outline: none;
      border-color: #667eea;
    }
    
    .timeline {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .timeline-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1.5rem;
      text-align: center;
    }
    
    .timeline-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .timeline-date {
      opacity: 0.9;
    }
    
    .timeline-items {
      padding: 1rem;
    }
    
    .timeline-item {
      display: flex;
      align-items: flex-start;
      padding: 1rem;
      border-bottom: 1px solid #e9ecef;
      position: relative;
    }
    
    .timeline-item:last-child {
      border-bottom: none;
    }
    
    .timeline-item::before {
      content: '';
      position: absolute;
      left: 30px;
      top: 45px;
      bottom: -45px;
      width: 2px;
      background: #e9ecef;
    }
    
    .timeline-item:last-child::before {
      display: none;
    }
    
    .timeline-time {
      min-width: 80px;
      font-weight: 600;
      color: #667eea;
      margin-right: 1rem;
    }
    
    .timeline-content {
      flex: 1;
      display: flex;
      align-items: center;
    }
    
    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      font-size: 1.2rem;
    }
    
    .icon-meal { background: #e8f5e8; color: #388e3c; }
    .icon-learning { background: #e3f2fd; color: #1976d2; }
    .icon-creative { background: #f3e5f5; color: #7b1fa2; }
    .icon-physical { background: #fff3e0; color: #f57c00; }
    .icon-rest { background: #fce4ec; color: #c2185b; }
    
    .activity-details h4 {
      margin: 0 0 0.25rem 0;
      color: #2c3e50;
    }
    
    .activity-details p {
      margin: 0;
      color: #6c757d;
      font-size: 0.9rem;
    }
    
    .empty-timeline {
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
      .track-child {
        padding: 1rem 0;
      }
      
      .page-header {
        padding: 1.5rem;
      }
      
      .page-title {
        font-size: 1.5rem;
      }
      
      .timeline-item {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .timeline-time {
        margin-bottom: 0.5rem;
      }
      
      .timeline-item::before {
        left: 15px;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="track-child">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Track Your Child</h1>
            <p className="page-subtitle">Monitor daily activities, meals, and progress</p>
          </div>

          <div className="child-selector">
            <div className="form-group">
              <label htmlFor="childSelect" className="form-label">Select Child</label>
              <select 
                id="childSelect"
                className="form-select"
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
              >
                <option value="">Choose a child...</option>
                {children.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="timeline">
            <div className="timeline-header">
              <h3 className="timeline-title">Daily Activities</h3>
              <div className="timeline-date">{new Date().toLocaleDateString()}</div>
            </div>
            
            <div className="timeline-items">
              {selectedChild && activities.length > 0 ? (
                activities.map(activity => (
                  <div key={activity.id} className="timeline-item">
                    <div className="timeline-time">{activity.time}</div>
                    <div className="timeline-content">
                      <div className={`activity-icon icon-${activity.type}`}>
                        {activity.type === 'meal' ? '🍎' :
                         activity.type === 'learning' ? '📚' :
                         activity.type === 'creative' ? '🎨' :
                         activity.type === 'physical' ? '⚽' : '😴'}
                      </div>
                      <div className="activity-details">
                        <h4>{activity.activity}</h4>
                        <p>
                          {activity.type === 'meal' ? 'Nutrition & Meal Time' :
                           activity.type === 'learning' ? 'Educational Activity' :
                           activity.type === 'creative' ? 'Creative Expression' :
                           activity.type === 'physical' ? 'Physical Development' : 'Rest Time'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-timeline">
                  <div className="empty-icon">👶</div>
                  <h3>No Activities to Display</h3>
                  <p>
                    {selectedChild 
                      ? 'No activities recorded for today' 
                      : 'Please select a child to view their activities'
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackChild;