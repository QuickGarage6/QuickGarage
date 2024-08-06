/* eslint-disable react-refresh/only-export-components */
// src/AuthContext.jsx

import { createContext, useState, useContext } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Create a provider component
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);
