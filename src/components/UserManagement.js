import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/users/')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">User Management</h2>
            <ul className="space-y-4">
                {users.map(user => (
                    <li key={user.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                        <span className="font-semibold text-lg text-gray-800">{user.username}</span> -
                        <span className="text-gray-600">{user.email}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
