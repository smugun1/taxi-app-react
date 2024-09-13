// Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import your custom hook
import Payment from './Payment';
// import { loadStripe } from '@stripe/stripe-js'; // Correctly import loadStripe

// // Confirm environment variable is loaded
// console.log('Stripe Publishable Key:', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// // Make sure to replace this with your actual public key
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const { isAuthenticated } = useAuth(); // Access auth state without passing the context
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return; // Prevents fetchStats from executing
    }

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Get token from local storage or state management
        if (!token) {
          console.error('No access token found. Please log in again.');
          navigate('/login'); // Redirect to login if token is missing
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/driver-licenses/', {
          headers: {
            'Authorization': `Bearer ${token}`, // Attach token to request headers
          },
        });

        setStats(response.data); // Save fetched stats to state
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
          // Server responded with a status other than 200
          console.error('Server Response:', error.response.status, error.response.data);
        } else if (error.request) {
          // Request was made but no response received
          console.error('No response received:', error.request);
        } else {
          // Something else happened
          console.error('Error:', error.message);
        }
      }
    };

    fetchStats();
  }, [isAuthenticated, navigate]); // Add isAuthenticated and navigate to the dependency array

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h2>Dashboard Stats</h2>
      <ul>
        <li>Total Rides: {stats.totalRides}</li>
        <li>Completed Rides: {stats.completedRides}</li>
        <li>Pending Rides: {stats.pendingRides}</li>
        <li>Canceled Rides: {stats.canceledRides}</li>
      </ul>

      <Payment />
    </div>
  );
};

export default Dashboard;
