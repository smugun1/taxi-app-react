import React, { useState, useEffect } from 'react';

// Assuming you have a fetchUsers function to get the user data
const fetchUsers = async () => {
  // Replace with actual API call
  const response = await fetch('http://localhost:8000/api/users');
  const data = await response.json();
  return data;
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };

    loadUsers();
  }, []);

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const renderEditForm = () => {
    if (!editingUser) return null;

    return (
      <div className="mt-4 p-4 bg-gray-100 rounded border border-gray-300">
        <h3 className="text-lg font-semibold mb-2">Edit User</h3>
        <form>
          <div className="mb-2">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={editingUser.email}
              className="border border-gray-300 rounded p-2 w-full"
              readOnly
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={editingUser.username}
              className="border border-gray-300 rounded p-2 w-full"
              readOnly
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">User Type</label>
            <input
              type="text"
              value={editingUser.user_type}
              className="border border-gray-300 rounded p-2 w-full"
              readOnly
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Active</label>
            <input
              type="text"
              value={editingUser.is_active ? 'Yes' : 'No'}
              className="border border-gray-300 rounded p-2 w-full"
              readOnly
            />
          </div>
          {/* Add additional fields and save logic here */}
        </form>
      </div>
    );
  };

  return (
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
      {renderEditForm()}
    </div>
  );
};

export default Users;
