import React, { useState } from 'react';
import axios from 'axios';

const AcceptRide = ({ rideId }) => {
    const [error, setError] = useState(null);

    const handleAccept = async () => {
        try {
            await axios.post(`/api/rides/${rideId}/accept/`, {}, { withCredentials: true });
            alert('Ride accepted');
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div>
            <button onClick={handleAccept}>Accept Ride</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default AcceptRide;
