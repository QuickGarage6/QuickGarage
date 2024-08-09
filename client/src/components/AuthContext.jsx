/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// src/AuthContext.jsx

import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userType , setUserType] = useState(null);
  const login = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated,userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);
