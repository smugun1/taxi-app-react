import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import EditUserForm from '../forms/EditUserForm';
import UserTable from '../forms/UserTable';
import AddUserForm from '../forms/AddUserForm';
import AddDriverLicence from '../forms/AddDriverLicence';
import AddVehicle from '../forms/AddVehicle';
import AddRide from '../forms/AddRide';
import AddLocation from '../forms/AddLocation';
import AddTransaction from '../forms/AddTransaction';
import Users from '../forms/Users';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [editFormData, setEditFormData] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users/'); // Corrected URL
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle form submission to update user
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/users/${editFormData.id}/`, editFormData); // Corrected URL
      // Refresh the user list after update
      const response = await axios.get('http://localhost:8000/api/users/'); // Corrected URL
      setUsers(response.data);
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const renderEditForm = () => {
    if (editingUser) {
      return (
        <EditUserForm
          editFormData={editFormData}
          setEditFormData={setEditFormData}
          handleEditFormSubmit={handleEditFormSubmit}
          setEditingUser={setEditingUser}
        />
      );
    }
    return null;
  };

  return (
    <div>
      {users && users.length > 0 ? (
        <>
          <Users />
          {renderEditForm()}
        </>
      ) : (
        <p>Loading users...</p>
      )}

      {/* Add User Form */}
      <div className="container hover:bg-slate-950 rounded-xl">
        <AddUserForm />
      </div>

      {/* Add User Table */}
      <div className="container hover:bg-slate-950 rounded-xl">
        <UserTable />
      </div>

      {/* Add Driver License Form */}
      <div className="container hover:bg-slate-950 rounded-xl">
        <AddDriverLicence />
      </div>

      {/* Add Vehicle Form */}
      <div className="container hover:bg-slate-950 rounded-xl">
        <AddVehicle />
      </div>

      {/* Add Ride Form */}
      <div className="container hover:bg-slate-950 rounded-xl">
        <AddRide />
      </div>

      {/* Add Location Form */}
      <div className="container hover:bg-slate-950 rounded-xl">
        <AddLocation />
      </div>

      {/* Add Transaction Form */}
      <div className="container hover:bg-slate-950 rounded-xl">
        <AddTransaction />
      </div>
    </div>
  );
};

export default Dashboard;
