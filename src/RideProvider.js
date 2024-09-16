import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create RideContext
export const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);

  // Function to refresh stats with new data
  const refreshStats = (data) => {
    setStats(data); // Update state with new data
  };

  // Fetch data from the API with authentication
  const fetchData = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/api/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      refreshStats(response.data); // Use the function defined above
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data.');
    }
  };

  // Function to handle adding a new ride
  const addRide = async (rideData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/api/rides/', rideData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      fetchData(token); // Refresh stats after adding a ride
      return response.data;
    } catch (error) {
      console.error('Error adding ride:', error);
      setError('Failed to add ride.');
      throw error;
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData(token);
    }
  }, []); // Run once on component mount

  return (
    <RideContext.Provider value={{ stats, refreshStats, addRide, error }}>
      {children}
    </RideContext.Provider>
  );
};
