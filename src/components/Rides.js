import React, { useState, useContext } from 'react';
import { RideContext } from '../contexts/RideContext';

const RideBooking = () => {
    const { addRide, refreshDashboardStats } = useContext(RideContext);
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const rideData = {
            passenger: "user-id", // Replace with actual user ID
            origin: pickupLocation,
            destination: dropoffLocation,
            driver: null,
            status: 'requested',
            pickup_time: null,
            dropoff_time: null
        };

        try {
            await addRide(rideData); // Call the addRide function from context
            setBookingSuccess(true); // Indicate success
            refreshDashboardStats(); // Update dashboard after booking
        } catch (error) {
            console.error('Error adding ride:', error);
            setBookingSuccess(false);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Book a Ride</h2>
                    {bookingSuccess && (
                        <p className="text-green-500 text-center mb-4">Ride booked successfully!</p>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="pickup" className="block text-sm font-medium text-gray-700">
                                Pickup Location (Address)
                            </label>
                            <input
                                type="text"
                                id="pickup"
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                                placeholder="Pickup Location"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dropoff" className="block text-sm font-medium text-gray-700">
                                Dropoff Location (Address)
                            </label>
                            <input
                                type="text"
                                id="dropoff"
                                value={dropoffLocation}
                                onChange={(e) => setDropoffLocation(e.target.value)}
                                placeholder="Dropoff Location"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Request Ride
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RideBooking;
