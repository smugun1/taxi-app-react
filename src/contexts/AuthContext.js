// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  // Function to handle login
  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  // Simplified logout function from the second example
  const logout = async () => {
    try {
      // Try calling Django's logout endpoint if necessary
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:8000/api/auth/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  // Define the checkAuthStatus function to verify token validity
  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found'); // Debugging log
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/get-user/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User authenticated:', data); // Debugging log
        setIsAuthenticated(true);
        setUser(data);
      } else {
        console.error('Error fetching authentication status');
        logout();
      }
    } catch (error) {
      console.error('Failed to fetch authentication status:', error);
      logout();
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e);
        setUser(null);
      }
    }

    // Check auth status on initial load
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
