import React, { useState } from 'react';

const AddLocation = () => {
    const [newLocationData, setNewLocationData] = useState({
        name: '',
        coordinates: '',
        description: '',
    });

    const handleCreateLocation = (event) => {
        event.preventDefault();
        console.log('New Location Data:', newLocationData);
        // Add the logic to send this data to the backend or perform necessary actions
    };

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLocationData({
            ...newLocationData,
            [name]: value,
        });
    };

  return (
    <div>
        <form onSubmit={handleCreateLocation} className="mb-8 bg-white p-6 rounded shadow-md">
    <h3 className="text-xl font-semibold mb-4 text-gray-700">Add Location</h3>
    <div className="mb-4">
      <label className="block text-gray-700">Name</label>
      <input
        type="text"
        value={newLocationData.name}
        onChange={(e) => setNewLocationData({ ...newLocationData, name: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Latitude</label>
      <input
        type="text"
        value={newLocationData.latitude}
        onChange={(e) => setNewLocationData({ ...newLocationData, latitude: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Longitude</label>
      <input
        type="text"
        value={newLocationData.longitude}
        onChange={(e) => setNewLocationData({ ...newLocationData, longitude: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Description</label>
      <input
        type="text"
        value={newLocationData.description}
        onChange={(e) => setNewLocationData({ ...newLocationData, description: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700">Active</label>
      <input
        type="checkbox"
        checked={newLocationData.is_active}
        onChange={(e) => setNewLocationData({ ...newLocationData, is_active: e.target.checked })}
      />
    </div>
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
      Create Location
    </button>
  </form>
  </div>
  )
}

export default AddLocation