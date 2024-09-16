import React, { useState } from 'react';

const AddDriverLicense = () => {
    // Initialize state
    const [newDriverLicenseData, setNewDriverLicenseData] = useState({
        licenseNumber: '',
        expirationDate: '',
    });

    // Function to handle form submission
    const handleCreateDriverLicense = (event) => {
        event.preventDefault();
        console.log('Driver License Data:', newDriverLicenseData);
        // Add logic to handle form submission (e.g., sending data to an API)
    };

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewDriverLicenseData({
            ...newDriverLicenseData,
            [name]: value,  // Update the specific field
        });
    };
    return (
        <form onSubmit={handleCreateDriverLicense} className="mb-8 bg-white p-6 rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Add Driver License</h3>
            <div className="mb-4">
                <label className="block text-gray-700">License Number</label>
                <input
                    type="text"
                    value={newDriverLicenseData.licenseNumber}
                    onChange={(e) => setNewDriverLicenseData({ ...newDriverLicenseData, licenseNumber: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Expiration Date</label>
                <input
                    type="date"
                    value={newDriverLicenseData.expirationDate}
                    onChange={(e) => setNewDriverLicenseData({ ...newDriverLicenseData, expirationDate: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Create Driver License
            </button>
        </form>
    );
};

export default AddDriverLicense;
