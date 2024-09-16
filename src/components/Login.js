import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../contexts/AuthContext'; // Import useAuth to access login

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    const { login } = useAuth(); // Use the login function from AuthContext

    const handleLogin = async () => {
        setError(''); // Clear any previous errors

        try {
            const response = await axios.post('http://localhost:8000/api/auth/login/', {
                email,
                password
            });

            const { access } = response.data;
            localStorage.setItem('token', access); // Store the token in localStorage

            // Call the login function from AuthContext to store the token and user data
            if (login) {
                login(access); // Ensure login function exists and works
            }

            // Navigate to a different page after successful login
            navigate('/'); // Change the path if needed
        } catch (error) {
            console.error('Error during login:', error.response ? error.response.data : error.message);
            setError('Login failed. Please check your email and password.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                autoComplete="email" // Enable email autocomplete
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                autoComplete="current-password" // Enable password autocomplete
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
