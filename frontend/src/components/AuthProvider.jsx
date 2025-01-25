import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('accessToken');
    return token ? jwtDecode(token) : null;
  });

  const login = (token) => {
    localStorage.setItem('accessToken', token);
    setUser(jwtDecode(token));
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
      localStorage.removeItem('accessToken');
      setUser(null);
      window.location.href = '/'; //redirect to home page after login
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);