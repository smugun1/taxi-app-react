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
import CreateRide from '../components/CreateRide';
import ListRides from '../components/ListRides';
import AcceptRide from '../components/AcceptRide';
import CompleteRide from '../components/CompleteRide';
import MapWithHeader from '../components/MapWithHeader';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [editFormData, setEditFormData] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedRide, setSelectedRide] = useState(null); // Manage selected ride
  const [rides, setRides] = useState([]);

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
    <div className="container mx-auto p-6 bg-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users Section */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          {users && users.length > 0 ? (
            <>
              <Users />
              {renderEditForm()}
            </>
          ) : (
            <p>Loading users...</p>
          )}
        </div>
        {/* User Table */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Table</h2>
          <div className="max-h-96 overflow-y-auto">
            <UserTable />
          </div>
        </div>


        {/* Add User Form */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add User</h2>
          <AddUserForm />
        </div>

        {/* Add Driver License Form */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Driver License</h2>
          <AddDriverLicence />
        </div>

        {/* Add Vehicle Form */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Vehicle</h2>
          <AddVehicle />
        </div>

        {/* Add Ride Form */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Ride</h2>
          <AddRide />
        </div>

        {/* Add Location Form */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Location</h2>
          <AddLocation />
        </div>

        {/* Add Transaction Form */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
          <AddTransaction />
        </div>

          {/* Map Section */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">List Rides</h2>
          <MapWithHeader />
        </div>

        {/* Create Ride Section */}
        <div className="bg-white p-4 rounded-xl shadow-md col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Create Ride</h2>
          <CreateRide />
        </div>

        {/* List Rides Section */}
        <div className="bg-white p-4 rounded-xl shadow-md col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">List Rides</h2>
          <ListRides setSelectedRide={setSelectedRide} />
        </div>

        {/* Manage Selected Ride */}
        {selectedRide && (
          <div className="bg-white p-4 rounded-xl shadow-md col-span-1 md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4">Manage Ride</h2>
            <AcceptRide rideId={selectedRide.id} />
            <CompleteRide rideId={selectedRide.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
