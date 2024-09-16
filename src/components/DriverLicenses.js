import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const DriverLicenses = () => {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = () => localStorage.getItem('access_token');
  const getRefreshToken = () => localStorage.getItem('refresh_token');

  const handleTokenRefresh = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/refresh/', {
        refresh: getRefreshToken(),
      });
      const { access } = response.data;
      localStorage.setItem('access_token', access);
      return access;
    } catch (error) {
      console.error('Error refreshing token:', error);
      setError('Unable to refresh token. Please log in again.');
      return null;
    }
  };

  // Wrap fetchData with useCallback
  const fetchData = useCallback(async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/api/driver-licenses/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setLicenses(response.data);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) { // Unauthorized
        const newToken = await handleTokenRefresh();
        if (newToken) {
          // Retry request with new token
          fetchData(newToken);
        } else {
          setLoading(false); // Ensure loading is false when token refresh fails
        }
      } else {
        console.error('Error fetching driver licenses:', error);
        setError('Failed to fetch driver licenses. Please try again later.');
        setLoading(false);
      }
    }
  }, [handleTokenRefresh]); // Add handleTokenRefresh to the dependency array

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setError('No authorization token found. Please log in.');
      setLoading(false);
      return;
    }

    fetchData(token);
  }, [fetchData]); // Add fetchData to the dependency array

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Driver Licenses</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {licenses.map((license) => (
          <li key={license.id} className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-xl font-semibold text-gray-700">License Number: {license.license_number}</p>
            {/* Add more license details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriverLicenses;
