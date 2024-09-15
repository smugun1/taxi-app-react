import React, { useState } from 'react';
import axios from 'axios';

const Geocode = () => {
    const [query, setQuery] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setCoordinates(null);

        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debugging line to check token

        if (!token) {
            setError('No token found');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/geocode/', { query }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setCoordinates(response.data.coordinates);

        } catch (err) {
            console.error('Error during API call:', err.response ? err.response.data : err.message);
            if (err.response && err.response.status === 404) {
                setError('No results found');
            } else {
                setError('Error connecting to API');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Geocode Query</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter a location"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {coordinates && (
                <div>
                    <h2>Coordinates</h2>
                    <p>Longitude: {coordinates[0]}</p>
                    <p>Latitude: {coordinates[1]}</p>
                </div>
            )}
        </div>
    );
};

export default Geocode;
