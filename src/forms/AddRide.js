import React, { useState } from 'react';

const AddRide = () => {
    // State to manage the ride form data
    const [newRideData, setNewRideData] = useState({
        driver: '',
        vehicle: '',
        passenger: '',
        startLocation: '',
        endLocation: '',
        fare: '',
        rideStatus: '',
    });

    // Function to handle form submission
    const handleCreateRide = (event) => {
        event.preventDefault();
        console.log('New Ride Data:', newRideData);
        // Add the logic to send this data to the backend or perform necessary actions
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRideData({
            ...newRideData,
            [name]: value,
        });
    };
    return (
        <div>
            <form onSubmit={handleCreateRide} className="mb-8 bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Add Ride</h3>
            <div className="mb-4">
                <label className="block text-gray-700">Passenger</label>
                <input
                    type="text"
                    value={newRideData.passenger}
                    onChange={(e) => setNewRideData({ ...newRideData, passenger: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Driver</label>
                <input
                    type="text"
                    value={newRideData.driver}
                    onChange={(e) => setNewRideData({ ...newRideData, driver: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Origin</label>
                <input
                    type="text"
                    value={newRideData.origin}
                    onChange={(e) => setNewRideData({ ...newRideData, origin: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Destination</label>
                <input
                    type="text"
                    value={newRideData.destination}
                    onChange={(e) => setNewRideData({ ...newRideData, destination: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <input
                    type="text"
                    value={newRideData.status}
                    onChange={(e) => setNewRideData({ ...newRideData, status: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Created At</label>
                <input
                    type="datetime-local"
                    value={newRideData.created_at}
                    onChange={(e) => setNewRideData({ ...newRideData, created_at: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Updated At</label>
                <input
                    type="datetime-local"
                    value={newRideData.updated_at}
                    onChange={(e) => setNewRideData({ ...newRideData, updated_at: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Pickup Time</label>
                <input
                    type="datetime-local"
                    value={newRideData.pickup_time}
                    onChange={(e) => setNewRideData({ ...newRideData, pickup_time: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Dropoff Time</label>
                <input
                    type="datetime-local"
                    value={newRideData.dropoff_time}
                    onChange={(e) => setNewRideData({ ...newRideData, dropoff_time: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Active</label>
                <input
                    type="checkbox"
                    checked={newRideData.is_active}
                    onChange={(e) => setNewRideData({ ...newRideData, is_active: e.target.checked })}
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Create Ride
            </button>
        </form>
        </div>
    )
}

export default AddRide