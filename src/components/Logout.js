import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      // Inform the user they are already logged out or provide next steps
      console.warn('No access token found. User might already be logged out or session expired.');
      alert('You are already logged out or your session has expired. Please log in again.');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/logout/', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Logout successful:', response.data);
      localStorage.removeItem('access_token'); // Clear token from local storage

    } catch (error) {
      console.error('Error logging out:', error);

      if (error.response) {
        console.error('Server Response:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return <button
  onClick={handleLogout}
  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
>
  Logout
</button>;
};

export default Logout;
