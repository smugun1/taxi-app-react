import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchRides, fetchTransaction, fetchDriverLicense, fetchVehicle} from '../services/api';
import '../App.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [rides, setRides] = useState([]);
  const [driverLicense, setDriverLicense] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [transaction, setTransaction] = useState([]);  // Add transactions state

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const getRides = async () => {
      try {
        const ridesData = await fetchRides();
        setRides(ridesData);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    const getDriverLicense = async () => {
      try {
        const driverLicenseData = await fetchDriverLicense();
        setDriverLicense(driverLicenseData);
      } catch (error) {
        console.error('Error fetching driverLicense:', error);
      }
    };

    const getVehicle = async () => {
      try {
        const vehicleData = await fetchVehicle();
        setVehicle(vehicleData);
      } catch (error) {
        console.error('Error fetching vehicle:', error);
      }
    };

    const getTransaction = async () => {
      try {
        const transactionData = await fetchTransaction();
        setTransaction(transactionData);
      } catch (error) {
        console.error('Error fetching transaction:', error);
      }
    };

    getUsers();
    getRides();
    getDriverLicense();
    getVehicle();
    getTransaction();
  }, []);

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      {/* User List */}
      <section>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>User Type</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.user_type}</td>
                <td>{user.is_active ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Ride List */}
      <section>
        <h2>Rides</h2>
        <table>
          <thead>
            <tr>
              <th>Passenger</th>
              <th>Driver</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Pickup Time</th>
              <th>Dropoff Time</th>
            </tr>
          </thead>
          <tbody>
            {rides.map(ride => (
              <tr key={ride.id}>
                <td>{ride.passenger}</td>
                <td>{ride.driver || 'No driver assigned'}</td>
                <td>{ride.origin}</td>
                <td>{ride.destination}</td>
                <td>{ride.status}</td>
                <td>{new Date(ride.created_at).toLocaleDateString()}</td>
                <td>{new Date(ride.updated_at).toLocaleDateString()}</td>
                <td>{new Date(ride.pickup_time).toLocaleDateString()}</td>
                <td>{new Date(ride.dropoff_time).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    {/* DriverLicense */}
      <section>
        <h2>DriverLicense</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>License_number</th>
              <th>Issue_date</th>
            </tr>
          </thead>
          <tbody>
            {driverLicense.map(user => (
              <tr key={user.id}>
                <td>{user.user}</td>
                <td>{user.license_number}</td>
                <td>{new Date(user.issue_date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Vehicle */}
      <section>
        <h2>Vehicle</h2>
        <table>
          <thead>
            <tr>
              <th>Owner</th>
              <th>Make</th>
              <th>Model</th>
              <th>Registration Number</th>
            </tr>
          </thead>
          <tbody>
            {vehicle.map(vehicle => (
              <tr key={vehicle.id}>
                <td>{vehicle.owner}</td>
                <td>{vehicle.make}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.registration_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Transaction List */}
      <section>
        <h2>Transaction</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Time Stamp</th>
            </tr>
          </thead>
          <tbody>
            {transaction.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.user}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
                <td>{new Date(transaction.timestamp).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
