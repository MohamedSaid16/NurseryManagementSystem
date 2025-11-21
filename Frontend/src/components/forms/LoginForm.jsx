import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { loading } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData.email, formData.password);
  };

  const styles = `
    .login-form {
      width: 100%;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      color: #495057;
      font-weight: 500;
      font-size: 0.9rem;
    }
    
    .form-input {
      width: 100%;
      padding: 1rem;
      border: 2px solid #e9ecef;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #f8f9fa;
    }
    
    .form-input:focus {
      outline: none;
      border-color: #667eea;
      background: white;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .form-input::placeholder {
      color: #6c757d;
    }
    
    .login-btn {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 0.5rem;
    }
    
    .login-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    
    .login-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }
    
    .btn-loading {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .loading-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid transparent;
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .forgot-password {
      text-align: center;
      margin-top: 1rem;
    }
    
    .forgot-link {
      color: #667eea;
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.3s ease;
    }
    
    .forgot-link:hover {
      color: #764ba2;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your email"
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your password"
            required
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="login-btn"
          disabled={loading || !formData.email || !formData.password}
        >
          {loading ? (
            <span className="btn-loading">
              <div className="loading-spinner"></div>
              Signing In...
            </span>
          ) : (
            'Sign In'
          )}
        </button>
        
        <div className="forgot-password">
          <a href="#" className="forgot-link">Forgot your password?</a>
        </div>
      </form>
    </>
  );
};

export default LoginForm;