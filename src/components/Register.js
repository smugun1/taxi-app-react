import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(2); // Default to 'driver'
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Post request to the Django backend
            await axios.post('/api/register/', { email, username, password, user_type: userType });
            alert('Registration successful');
            // Clear form fields
            setEmail('');
            setUsername('');
            setPassword('');
            setUserType(2); // Reset userType to default
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>User Type:</label>
                <select
                    value={userType}
                    onChange={(e) => setUserType(Number(e.target.value))}
                >
                    <option value={1}>Admin</option>
                    <option value={2}>Driver</option>
                    <option value={3}>Passenger</option>
                </select>
            </div>
            <button type="submit">Register</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Register;
