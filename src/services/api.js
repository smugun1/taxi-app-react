import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adjust as necessary

// Function to create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Function to create a new driver license
export const createDriverLicense = async (driverLicenseData) => {
  try {
    const response = await axios.post(`${API_URL}/driver-licenses/`, driverLicenseData);
    return response.data;
  } catch (error) {
    console.error('Error creating driver license:', error);
    throw error;
  }
};

// Function to create a new vehicle
export const createVehicle = async (vehicleData) => {
  try {
    const response = await axios.post(`${API_URL}/vehicles/`, vehicleData);
    return response.data;
  } catch (error) {
    console.error('Error creating vehicle:', error);
    throw error;
  }
};

// Function to create a new ride
export const createRide = async (rideData) => {
  try {
    const response = await axios.post(`${API_URL}/rides/`, rideData);
    return response.data;
  } catch (error) {
    console.error('Error creating ride:', error);
    throw error;
  }
};

// Function to create a new location
export const createLocation = async (locationData) => {
  try {
    const response = await axios.post(`${API_URL}/locations/`, locationData);
    return response.data;
  } catch (error) {
    console.error('Error creating location:', error);
    throw error;
  }
};

// Function to create a new transaction
export const createTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_URL}/transactions/`, transactionData);
    return response.data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

// Existing functions
export const fetchUsers = async () => { /* ... */ };
export const fetchDriverLicense = async () => { /* ... */ };
export const fetchVehicle = async () => { /* ... */ };
export const fetchRides = async () => { /* ... */ };
export const fetchLocation = async () => { /* ... */ };
export const fetchTransaction = async () => { /* ... */ };
export const updateUser = async (id, userData) => { /* ... */ };
