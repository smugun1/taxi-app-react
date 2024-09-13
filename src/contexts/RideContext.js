// src/contexts/RideContext.js
import React, {useContext, createContext, useState } from 'react';
import axios from 'axios';

// Create RideContext
export const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const [dashboardStats, setDashboardStats] = useState({});

  const refreshDashboardStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/dashboard-stats');
      setDashboardStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const addRide = async (rideData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/rides/', rideData);
      refreshDashboardStats(); // Call refresh after a ride is added
      return response.data;
    } catch (error) {
      console.error('Error adding ride:', error);
      throw error;
    }
  };

  return (
    <RideContext.Provider value={{ dashboardStats, refreshDashboardStats, addRide }}>
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => useContext(RideContext);