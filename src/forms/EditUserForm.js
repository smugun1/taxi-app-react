import React, { useState } from 'react';
import EditUserForm from './EditUserForm'; // Import your EditUserForm component

const Users = () => {
    const [users, setUsers] = useState([]); // Example state for users
    const [editingUser, setEditingUser] = useState(null); // State to manage which user is being edited
    const [editFormData, setEditFormData] = useState({
        email: '',
        username: '',
        user_type: 'passenger',
        is_active: false
    }); // State to manage form data

    // Handle form submission
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        // Logic to update the user data
        // For example, make an API call to update the user
        console.log('Submitting form with data:', editFormData);

        // Reset the form and editing state
        setEditingUser(null);
        // Fetch updated users list
        // setUsers(updatedUsers);
    };

    // Handle user edit button click
    const handleEditUser = (user) => {
        // Populate the form with existing user data
        setEditFormData({
            email: user.email,
            username: user.username,
            user_type: user.user_type,
            is_active: user.is_active
        });
        setEditingUser(user); // Set the user being edited
    };

    return (
        <div>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

                {/* User Table */}
                <h2 className="text-xl font-semibold mb-4">Users</h2>
                {users && users.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Username</th>
                                <th className="py-2 px-4 border-b">User Type</th>
                                <th className="py-2 px-4 border-b">Active</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b">{user.username}</td>
                                    <td className="py-2 px-4 border-b">{user.user_type}</td>
                                    <td className="py-2 px-4 border-b">{user.is_active ? 'Yes' : 'No'}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleEditUser(user)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading users...</p>
                )}
                {editingUser && (
                    <EditUserForm
                        editFormData={editFormData}
                        setEditFormData={setEditFormData}
                        handleEditFormSubmit={handleEditFormSubmit}
                        setEditingUser={setEditingUser}
                    />
                )}
            </div>
        </div>
    );
};

export default Users;
