import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      // For demo purposes - replace with actual API call
      if (email === 'parent@demo.com' && password === 'demo123') {
        const userData = {
          id: 1,
          name: 'John Parent',
          email: 'parent@demo.com',
          role: 'parent'
        };
        setUser(userData);
        localStorage.setItem('token', 'demo-token-parent');
        return { success: true, data: { user: userData, token: 'demo-token-parent' } };
      } else if (email === 'employee@demo.com' && password === 'demo123') {
        const userData = {
          id: 2,
          name: 'Jane Employee',
          email: 'employee@demo.com',
          role: 'employee'
        };
        setUser(userData);
        localStorage.setItem('token', 'demo-token-employee');
        return { success: true, data: { user: userData, token: 'demo-token-employee' } };
      } else if (email === 'admin@demo.com' && password === 'demo123') {
        const userData = {
          id: 3,
          name: 'Admin User',
          email: 'admin@demo.com',
          role: 'admin'
        };
        setUser(userData);
        localStorage.setItem('token', 'demo-token-admin');
        return { success: true, data: { user: userData, token: 'demo-token-admin' } };
      } else {
        return { 
          success: false, 
          error: 'Invalid email or password' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};