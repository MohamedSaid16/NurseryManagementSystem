import React, { useState, useEffect } from 'react';

const DailyActivities = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    childId: '',
    activityType: '',
    description: '',
    duration: ''
  });

  const [children] = useState([
    { id: 1, name: 'Emma Smith', class: 'Sunshine Class' },
    { id: 2, name: 'Noah Johnson', class: 'Sunshine Class' },
    { id: 3, name: 'Sophia Brown', class: 'Rainbow Class' },
    { id: 4, name: 'Liam Davis', class: 'Rainbow Class' }
  ]);

  const activityTypes = [
    { value: 'art', label: 'Art & Crafts', icon: '🎨' },
    { value: 'music', label: 'Music & Dance', icon: '🎵' },
    { value: 'outdoor', label: 'Outdoor Play', icon: '⚽' },
    { value: 'learning', label: 'Learning Activity', icon: '📚' },
    { value: 'nap', label: 'Nap Time', icon: '😴' },
    { value: 'meal', label: 'Meal Time', icon: '🍎' }
  ];

  useEffect(() => {
    // Mock data - replace with API call
    const mockActivities = [
      {
        id: 1,
        childName: 'Emma Smith',
        activityType: 'art',
        description: 'Finger painting with primary colors',
        duration: '45 minutes',
        time: '2024-01-15 10:30'
      },
      {
        id: 2,
        childName: 'Noah Johnson',
        activityType: 'outdoor',
        description: 'Playground activities and running',
        duration: '30 minutes',
        time: '2024-01-15 11:00'
      }
    ];
    setActivities(mockActivities);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newActivity.childId && newActivity.activityType && newActivity.description) {
      const child = children.find(c => c.id === parseInt(newActivity.childId));
      const activityType = activityTypes.find(t => t.value === newActivity.activityType);
      
      const activity = {
        id: activities.length + 1,
        childName: child.name,
        activityType: newActivity.activityType,
        description: newActivity.description,
        duration: newActivity.duration || 'Not specified',
        time: new Date().toLocaleString()
      };
      
      setActivities([activity, ...activities]);
      setNewActivity({
        childId: '',
        activityType: '',
        description: '',
        duration: ''
      });
    }
  };

  const getActivityIcon = (type) => {
    const activity = activityTypes.find(t => t.value === type);
    return activity ? activity.icon : '📝';
  };

  const styles = `
    .daily-activities {
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
    
    .activities-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
    
    .form-section {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .section-title {
      font-size: 1.3rem;
      color: #2c3e50;
      margin-bottom: 1.5rem;
      font-weight: 600;
    }
    
    .activity-form {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
    }
    
    .form-label {
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    .form-input, .form-select, .form-textarea {
      padding: 0.75rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.3s ease;
    }
    
    .form-input:focus, .form-select:focus, .form-textarea:focus {
      outline: none;
      border-color: #667eea;
    }
    
    .form-textarea {
      resize: vertical;
      min-height: 100px;
    }
    
    .activity-type-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    
    .activity-type-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem 0.5rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .activity-type-btn:hover {
      border-color: #667eea;
      transform: translateY(-2px);
    }
    
    .activity-type-btn.selected {
      border-color: #667eea;
      background: #f0f4ff;
    }
    
    .activity-icon {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    .activity-label {
      font-size: 0.8rem;
      text-align: center;
      font-weight: 500;
    }
    
    .submit-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 1rem;
    }
    
    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    
    .activities-list {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      max-height: 600px;
      overflow-y: auto;
    }
    
    .activity-item {
      display: flex;
      align-items: flex-start;
      padding: 1.5rem;
      border-bottom: 1px solid #e9ecef;
      transition: background 0.3s ease;
    }
    
    .activity-item:hover {
      background: #f8f9fa;
    }
    
    .activity-item:last-child {
      border-bottom: none;
    }
    
    .activity-icon-large {
      font-size: 2rem;
      margin-right: 1rem;
      flex-shrink: 0;
    }
    
    .activity-details {
      flex: 1;
    }
    
    .activity-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }
    
    .activity-child {
      font-weight: 600;
      color: #2c3e50;
      font-size: 1.1rem;
    }
    
    .activity-time {
      color: #6c757d;
      font-size: 0.9rem;
    }
    
    .activity-description {
      color: #495057;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }
    
    .activity-meta {
      display: flex;
      gap: 1rem;
      font-size: 0.85rem;
      color: #6c757d;
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
      .daily-activities {
        padding: 1rem 0;
      }
      
      .page-header {
        padding: 1.5rem;
      }
      
      .activities-container {
        grid-template-columns: 1fr;
      }
      
      .form-section, .activities-list {
        padding: 1.5rem;
      }
      
      .activity-type-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .page-title {
        font-size: 1.5rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="daily-activities">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Daily Activities</h1>
            <p className="page-subtitle">Log and track children's daily activities and progress</p>
          </div>

          <div className="activities-container">
            <div className="form-section">
              <h3 className="section-title">Log New Activity</h3>
              <form onSubmit={handleSubmit} className="activity-form">
                <div className="form-group">
                  <label className="form-label">Select Child</label>
                  <select
                    value={newActivity.childId}
                    onChange={(e) => setNewActivity({...newActivity, childId: e.target.value})}
                    className="form-select"
                    required
                  >
                    <option value="">Choose a child...</option>
                    {children.map(child => (
                      <option key={child.id} value={child.id}>
                        {child.name} - {child.class}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Activity Type</label>
                  <div className="activity-type-grid">
                    {activityTypes.map(type => (
                      <button
                        key={type.value}
                        type="button"
                        className={`activity-type-btn ${newActivity.activityType === type.value ? 'selected' : ''}`}
                        onClick={() => setNewActivity({...newActivity, activityType: type.value})}
                      >
                        <div className="activity-icon">{type.icon}</div>
                        <div className="activity-label">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    value={newActivity.duration}
                    onChange={(e) => setNewActivity({...newActivity, duration: e.target.value})}
                    className="form-input"
                    placeholder="e.g., 30 minutes, 1 hour..."
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Activity Description</label>
                  <textarea
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                    className="form-textarea"
                    placeholder="Describe the activity, materials used, child's engagement, and any observations..."
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Log Activity
                </button>
              </form>
            </div>

            <div className="activities-list">
              <h3 className="section-title">Recent Activities</h3>
              {activities.length > 0 ? (
                activities.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon-large">
                      {getActivityIcon(activity.activityType)}
                    </div>
                    <div className="activity-details">
                      <div className="activity-header">
                        <div className="activity-child">{activity.childName}</div>
                        <div className="activity-time">
                          {new Date(activity.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                      <div className="activity-description">
                        {activity.description}
                      </div>
                      <div className="activity-meta">
                        <span>Duration: {activity.duration}</span>
                        <span>•</span>
                        <span>
                          {activityTypes.find(t => t.value === activity.activityType)?.label}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📝</div>
                  <h3>No Activities Logged</h3>
                  <p>Start logging activities using the form on the left.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DailyActivities;