// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:8000/auth/login/', // Ensure this matches Django endpoint
                { username, password },
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            localStorage.setItem('token', response.data.token);
            alert('Login successful');
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Login;
