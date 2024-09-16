import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook to redirect the user

const Geocode = () => {
    const [query, setQuery] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hook for navigation

    const refreshAuthToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            throw new Error('No refresh token found');
        }

        try {
            const response = await fetch('http://localhost:8000/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access);
            return data.access;
        } catch (error) {
            console.error('Token refresh error:', error);
            throw error;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setCoordinates(null);

        let token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in.');
            setLoading(false);
            return;
        }

        try {
            let response = await fetch('http://localhost:8000/api/geocode/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ query }),
            });

            if (response.status === 401) {
                console.log('Token expired, attempting refresh...');
                token = await refreshAuthToken();
                if (token) {
                    console.log('Retrying request with new token...');
                    response = await fetch('http://localhost:8000/api/geocode/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({ query }),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    setCoordinates([data.longitude, data.latitude]);
                }
            } else if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                setCoordinates([data.longitude, data.latitude]);
            }
        } catch (error) {
            setError('Error during API call: ' + error.message);
            console.error('Error during API call:', error);
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
