// src/contexts/RideContext.js
import React, {useContext, createContext, useState } from 'react';
import axios from 'axios';

// Create RideContext
export const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const [stats, setStats] = useState({});

  const refreshStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const addRide = async (rideData) => {
    try {
      const response = await axios.post('http://localhost:8000/api/rides/', rideData);
      refreshStats(); // Call refresh after a ride is added
      return response.data;
    } catch (error) {
      console.error('Error adding ride:', error);
      throw error;
    }
  };

  return (
    <RideContext.Provider value={{ stats, refreshStats, addRide }}>
      {children}
    </RideContext.Provider>
  );
};

export const useRide = () => useContext(RideContext);