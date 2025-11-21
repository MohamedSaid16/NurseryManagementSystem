import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const UserRoleContext = createContext();

export const useUserRole = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};

export const UserRoleProvider = ({ children }) => {
  const { user } = useAuth();

  const hasRole = (allowedRoles) => {
    return user && allowedRoles.includes(user.role);
  };

  const isParent = user?.role === 'parent';
  const isEmployee = user?.role === 'employee';
  const isAdmin = user?.role === 'admin';

  const value = {
    hasRole,
    isParent,
    isEmployee,
    isAdmin,
    currentRole: user?.role
  };

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
};