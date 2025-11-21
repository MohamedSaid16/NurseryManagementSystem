import React, { useState } from 'react';

const RegisterChild = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    allergies: '',
    medicalConditions: '',
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
    // Handle form submission
    alert('Child registration submitted!');
  };

  const styles = `
    .register-child {
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
    
    .registration-form {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .form-section {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #e9ecef;
    }
    
    .form-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    
    .section-title {
      font-size: 1.3rem;
      color: #2c3e50;
      margin-bottom: 1.5rem;
      font-weight: 600;
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
    
    .form-label.required::after {
      content: ' *';
      color: #dc3545;
    }
    
    .form-input, .form-select, .form-textarea {
      width: 100%;
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
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .form-textarea {
      resize: vertical;
      min-height: 100px;
    }
    
    .form-help {
      font-size: 0.85rem;
      color: #6c757d;
      margin-top: 0.25rem;
    }
    
    .submit-section {
      text-align: center;
      padding-top: 2rem;
    }
    
    .submit-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem 3rem;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    
    .form-note {
      background: #e7f3ff;
      border: 1px solid #b3d9ff;
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1rem;
    }
    
    .form-note h4 {
      color: #0066cc;
      margin-bottom: 0.5rem;
    }
    
    .form-note p {
      color: #004d99;
      margin: 0;
      font-size: 0.9rem;
    }
    
    @media (max-width: 768px) {
      .register-child {
        padding: 1rem 0;
      }
      
      .page-header {
        padding: 1.5rem;
      }
      
      .registration-form {
        padding: 1.5rem;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .page-title {
        font-size: 1.5rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="register-child">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Register New Child</h1>
            <p className="page-subtitle">Enroll your child in our nursery program</p>
          </div>

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label required">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label required">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="birthDate" className="form-label required">Date of Birth</label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender" className="form-label required">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Health Information</h3>
              <div className="form-group">
                <label htmlFor="allergies" className="form-label">Allergies</label>
                <textarea
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="List any allergies your child has..."
                />
                <div className="form-help">Please be specific about allergens and reactions</div>
              </div>
              
              <div className="form-group">
                <label htmlFor="medicalConditions" className="form-label">Medical Conditions</label>
                <textarea
                  id="medicalConditions"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="List any medical conditions or special needs..."
                />
                <div className="form-help">Include any medications or special care requirements</div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Emergency Contact</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="emergencyContact" className="form-label required">Contact Name</label>
                  <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emergencyPhone" className="form-label required">Phone Number</label>
                  <input
                    type="tel"
                    id="emergencyPhone"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-note">
              <h4>📋 Important Information</h4>
              <p>
                After submitting this form, our administration will contact you to complete the enrollment process, 
                discuss program details, and schedule an orientation visit. Please allow 2-3 business days for processing.
              </p>
            </div>

            <div className="submit-section">
              <button type="submit" className="submit-btn">
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterChild;