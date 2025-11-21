import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ParentProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const styles = `
    .parent-profile {
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
    
    .profile-container {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 2rem;
    }
    
    .profile-sidebar {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      padding: 2rem;
      text-align: center;
    }
    
    .profile-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      color: white;
      margin: 0 auto 1.5rem;
    }
    
    .profile-name {
      font-size: 1.5rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }
    
    .profile-role {
      background: #e7f3ff;
      color: #0066cc;
      padding: 0.25rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      display: inline-block;
      margin-bottom: 1.5rem;
    }
    
    .profile-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin: 2rem 0;
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-number {
      font-size: 1.5rem;
      font-weight: 600;
      color: #667eea;
      display: block;
    }
    
    .stat-label {
      font-size: 0.8rem;
      color: #6c757d;
    }
    
    .profile-content {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      padding: 2rem;
    }
    
    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #e9ecef;
    }
    
    .content-title {
      font-size: 1.5rem;
      color: #2c3e50;
      font-weight: 600;
    }
    
    .edit-btn {
      background: #667eea;
      color: white;
      border: none;
      padding: 0.5rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .edit-btn:hover {
      background: #5a6fd8;
      transform: translateY(-1px);
    }
    
    .profile-form {
      display: grid;
      gap: 1.5rem;
    }
    
    .form-section {
      margin-bottom: 2rem;
    }
    
    .section-title {
      font-size: 1.2rem;
      color: #2c3e50;
      margin-bottom: 1rem;
      font-weight: 600;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f8f9fa;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
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
    
    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }
    
    .form-input:focus {
      outline: none;
      border-color: #667eea;
    }
    
    .form-input:disabled {
      background: #f8f9fa;
      color: #6c757d;
    }
    
    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 1px solid #e9ecef;
    }
    
    .cancel-btn {
      background: #6c757d;
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
    }
    
    .save-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .save-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    
    .info-grid {
      display: grid;
      gap: 1.5rem;
    }
    
    .info-item {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }
    
    .info-label {
      font-weight: 600;
      color: #2c3e50;
    }
    
    .info-value {
      color: #6c757d;
    }
    
    @media (max-width: 768px) {
      .parent-profile {
        padding: 1rem 0;
      }
      
      .page-header {
        padding: 1.5rem;
      }
      
      .profile-container {
        grid-template-columns: 1fr;
      }
      
      .profile-sidebar {
        text-align: center;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .form-actions {
        flex-direction: column;
      }
      
      .page-title {
        font-size: 1.5rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="parent-profile">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">My Profile</h1>
            <p className="page-subtitle">Manage your account information and preferences</p>
          </div>

          <div className="profile-container">
            <div className="profile-sidebar">
              <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h2 className="profile-name">{user?.name}</h2>
              <div className="profile-role">Parent</div>
              
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-number">2</span>
                  <span className="stat-label">Children</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">156</span>
                  <span className="stat-label">Days</span>
                </div>
              </div>
              
              <p style={{color: '#6c757d', fontSize: '0.9rem'}}>
                Member since January 2023
              </p>
            </div>

            <div className="profile-content">
              <div className="content-header">
                <h3 className="content-title">Personal Information</h3>
                {!isEditing && (
                  <button 
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="profile-form">
                  <div className="form-section">
                    <h4 className="section-title">Basic Information</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-input"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="123 Main St, City, State 12345"
                      />
                    </div>
                  </div>

                  <div className="form-section">
                    <h4 className="section-title">Emergency Contact</h4>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Contact Name</label>
                        <input
                          type="text"
                          name="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="Emergency contact person"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Contact Phone</label>
                        <input
                          type="tel"
                          name="emergencyPhone"
                          value={formData.emergencyPhone}
                          onChange={handleChange}
                          className="form-input"
                          placeholder="+1 (555) 987-6543"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="save-btn">
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="info-grid">
                  <div className="form-section">
                    <h4 className="section-title">Basic Information</h4>
                    <div className="info-item">
                      <span className="info-label">Full Name</span>
                      <span className="info-value">{user?.name}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Email</span>
                      <span className="info-value">{user?.email}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Phone</span>
                      <span className="info-value">+1 (555) 123-4567</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Address</span>
                      <span className="info-value">123 Main St, Anytown, USA</span>
                    </div>
                  </div>

                  <div className="form-section">
                    <h4 className="section-title">Emergency Contact</h4>
                    <div className="info-item">
                      <span className="info-label">Contact Name</span>
                      <span className="info-value">Jane Doe</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Contact Phone</span>
                      <span className="info-value">+1 (555) 987-6543</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Relationship</span>
                      <span className="info-value">Grandmother</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentProfile;