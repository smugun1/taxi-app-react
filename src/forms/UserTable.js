import React, { useState } from 'react';

const UserTable = () => {
    // Initial state with some sample user data
    const [users, setUsers] = useState([
        { id: 1, username: 'JohnDoe', email: 'john@example.com', user_type: 'passenger', is_active: true },
        { id: 2, username: 'JaneSmith', email: 'jane@example.com', user_type: 'driver', is_active: false },
    ]);

    // Function to handle editing a user (you can expand this to open a modal or a form)
    const handleEditUser = (user) => {
        console.log('Editing user:', user);
        // You can add logic here to update the user data or open a form/modal
    }

    return (
        <div>
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
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user?.id || user.email}>
                                <td className="py-2 px-4 border-b">{user?.email || 'N/A'}</td>
                                <td className="py-2 px-4 border-b">{user?.username || 'N/A'}</td>
                                <td className="py-2 px-4 border-b">{user?.user_type || 'N/A'}</td>
                                <td className="py-2 px-4 border-b">{user?.is_active ? 'Yes' : 'No'}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleEditUser(user)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-2 px-4 text-center">
                                No users available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
