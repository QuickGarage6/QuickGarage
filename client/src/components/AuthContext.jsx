/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
// src/AuthContext.jsx

import { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType , setUserType] = useState(null);
  const login = (type) => {
    setIsAuthenticated(true);
    setUserType(type);
    localStorage.setItem('userType', type);
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    localStorage.removeItem('userType');
  };
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated,userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
