import React from 'react';
import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      alert('You are already logged out or your session has expired. Please log in again.');
      window.location.href = '/login'; // Redirect to login
      return;
    }

    try {
      // const response = await axios.post('http://127.0.0.1:8000/api/logout/', {}, {
      //   headers: {
      //     'Authorization': `Bearer ${token}`  // Pass the access token in the headers
      //   }
      // });

      localStorage.removeItem('access_token');
      alert('Logged out successfully.');
      window.location.href = '/'; // Redirect after logout

    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out. Please try again.');
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
