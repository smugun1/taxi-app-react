import React, { useState } from 'react';
import axios from 'axios';

const CompleteRide = ({ rideId }) => {
    const [error, setError] = useState(null);

    const handleComplete = async () => {
        try {
            await axios.post(`http://localhost:8000/api/rides/${rideId}/complete/`, {}, { withCredentials: true });
            alert('Ride completed');
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div>
            <button onClick={handleComplete}>Complete Ride</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default CompleteRide;
