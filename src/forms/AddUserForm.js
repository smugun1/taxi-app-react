import React, { useState } from 'react';

const AddUserForm = () => {
    // Define state for the user data
    const [newUserData, setNewUserData] = useState({
        email: '',
        name: '',
        password: '',
    });

    // Function to handle form submission
    const handleCreateUser = (event) => {
        event.preventDefault();
        console.log('User Data:', newUserData);
        // Add logic here to send newUserData to the backend
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData({
            ...newUserData,
            [name]: value,  // Dynamically update the field based on the input's name
        });
    };
    return (
        <div>
        <form onSubmit={handleCreateUser} className="mb-8 bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Add User</h3>
            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                    type="email"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                    type="text"
                    value={newUserData.username}
                    onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">User Type</label>
                <select
                    value={newUserData.user_type}
                    onChange={(e) => setNewUserData({ ...newUserData, user_type: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="passenger">Passenger</option>
                    <option value="driver">Driver</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Active</label>
                <input
                    type="checkbox"
                    checked={newUserData.is_active}
                    onChange={(e) => setNewUserData({ ...newUserData, is_active: e.target.checked })}
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Create User
            </button>
        </form>
        </div>
    );
};

export default AddUserForm;
