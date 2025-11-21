import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  const styles = `
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 50vh;
      flex-direction: column;
      gap: 1rem;
    }
    
    .loading-text {
      color: #6c757d;
      font-size: 1.1rem;
    }
    
    .access-denied {
      text-align: center;
      padding: 3rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      margin: 2rem auto;
      max-width: 500px;
    }
    
    .access-denied h2 {
      color: #dc3545;
      margin-bottom: 1rem;
    }
    
    .access-denied p {
      color: #6c757d;
      margin-bottom: 2rem;
    }
  `;

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading...</div>
        </div>
      </>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <>
        <style>{styles}</style>
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
          <a href="/" className="btn btn-primary">Go Home</a>
        </div>
      </>
    );
  }

  return children;
};

export default ProtectedRoute;