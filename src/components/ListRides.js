import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListRides = () => {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/rides/', { withCredentials: true });
                setRides(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRides();
    }, []);

    return (
        <div>
            <h2>Rides</h2>
            <ul>
                {rides.map((ride) => (
                    <li key={ride.id}>
                        {ride.origin} to {ride.destination} - {ride.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListRides;
