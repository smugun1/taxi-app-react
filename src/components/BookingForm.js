import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [passengerId, setPassengerId] = useState('');
  const [rideDetails, setRideDetails] = useState({
    // other form fields
    pickupLocation: '',
    dropoffLocation: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        passenger_id: passengerId,
        pickup_location: rideDetails.pickupLocation,
        dropoff_location: rideDetails.dropoffLocation
        // other fields as needed
      };

      const response = await axios.post('http://127.0.0.1:8000/api/bookings/', payload);

      console.log('Booking success:', response.data);
      // Handle success, possibly redirect or show success message
    } catch (error) {
      console.error('Booking error:', error);
      setError(error.response ? error.response.data.detail : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Passenger ID"
        value={passengerId}
        onChange={(e) => setPassengerId(e.target.value)}
      />
      {/* Other form fields */}
      <button type="submit">Book Ride</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default BookingForm;
