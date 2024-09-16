import React, { useState } from 'react';

const AddVehicle = () => {
    // State to manage the vehicle form data
    const [newVehicleData, setNewVehicleData] = useState({
        vehicleId: '',
        make: '',
        model: '',
        year: '',
        licensePlate: '',
    });

    // Function to handle form submission
    const handleCreateVehicle = (event) => {
        event.preventDefault();
        console.log('New Vehicle Data:', newVehicleData);
        // Add logic to send this data to the backend or perform necessary actions
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVehicleData({
            ...newVehicleData,
            [name]: value,
        });
    };
    return (
        <div>
            <form onSubmit={handleCreateVehicle} className="mb-8 bg-white p-6 rounded shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Add Vehicle</h3>
                <div className="mb-4">
                    <label className="block text-gray-700">Owner</label>
                    <input
                        type="text"
                        value={newVehicleData.owner}
                        onChange={(e) => setNewVehicleData({ ...newVehicleData, owner: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Make</label>
                    <input
                        type="text"
                        value={newVehicleData.make}
                        onChange={(e) => setNewVehicleData({ ...newVehicleData, make: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Model</label>
                    <input
                        type="text"
                        value={newVehicleData.model}
                        onChange={(e) => setNewVehicleData({ ...newVehicleData, model: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Registration Number</label>
                    <input
                        type="text"
                        value={newVehicleData.registration_number}
                        onChange={(e) => setNewVehicleData({ ...newVehicleData, registration_number: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Active</label>
                    <input
                        type="checkbox"
                        checked={newVehicleData.is_active}
                        onChange={(e) => setNewVehicleData({ ...newVehicleData, is_active: e.target.checked })}
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create Vehicle
                </button>
            </form>
        </div>
    )
}

export default AddVehicle