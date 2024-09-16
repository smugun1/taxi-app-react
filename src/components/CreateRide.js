import React, { useState } from 'react';
import axios from 'axios';

const CreateRide = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8000/api/rides/', { origin, destination }, { withCredentials: true });
            alert('Ride created');
            setOrigin('');
            setDestination('');
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Origin:
                    <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Destination:
                    <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
                </label>
            </div>
            <button type="submit">Create Ride</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default CreateRide;
