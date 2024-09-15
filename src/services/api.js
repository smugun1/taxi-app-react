// api.js
import axios from 'axios';

// Function to get token from localStorage
const getToken = () => localStorage.getItem('authToken');

// Create Axios instance with dynamic Authorization header
const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Your backend URL
});

// Set Authorization header dynamically based on token presence
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Log the headers for debugging
api.interceptors.request.use((config) => {
  console.log("Axios default headers:", config.headers);
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Fetch users function
export const fetchUsers = async () => {
  try {
    const response = await api.get('/users/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users', error.response || error.message);
    throw error;  // Re-throw the error if needed for error handling in components
  }
};

// Fetch rides function
export const fetchRides = async () => {
  try {
    const response = await api.get('/rides/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch rides', error.response || error.message);
    throw error;  // Re-throw the error if needed for error handling in components
  }
};

// Fetch vehicles function
export const fetchVehicle = async () => {
  try {
    const response = await api.get('/vehicle/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch vehicle', error.response || error.message);
    throw error;  // Re-throw the error if needed for error handling in components
  }
};

// Fetch driver licenses function
export const fetchDriverLicense = async () => {
  try {
    const response = await api.get('/driver-license/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch driver-license', error.response || error.message);
    throw error;  // Re-throw the error if needed for error handling in components
  }
};

// Fetch transactions function
export const fetchTransaction = async () => {
  try {
    const response = await api.get('/transaction-list/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch transaction', error.response || error.message);
    throw error;  // Re-throw the error if needed for error handling in components
  }
};
