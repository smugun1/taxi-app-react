import React from 'react';
import { Link } from 'react-router-dom';
import { FaTaxi } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext'; // Correct import for useAuth

const Home = () => {
  const { isAuthenticated } = useAuth(); // Use the custom hook

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden">
  {/* Background Overlay */}
  <div className="absolute inset-0">
    <div className="w-full h-full bg-black opacity-40"></div>
  </div>

  {/* Top Left Element */}
<div className="absolute top-8 left-8">
  <div className="relative p-10 bg-purple-700 rounded-lg shadow-lg">
    <div className="p-8 bg-purple-500 rounded-lg shadow-lg">
      <div className="p-6 bg-purple-300 rounded-lg shadow-lg">
        <p className="text-white font-semibold text-xl">Top Left Item</p>
      </div>
    </div>
  </div>
</div>

{/* Top Right Element */}
<div className="absolute top-8 right-8">
  <div className="relative p-10 bg-blue-700 rounded-lg shadow-lg">
    <div className="p-8 bg-blue-500 rounded-lg shadow-lg">
      <div className="p-6 bg-blue-300 rounded-lg shadow-lg">
        <p className="text-white font-semibold text-xl">Top Right Item</p>
      </div>
    </div>
  </div>
</div>

{/* Bottom Left Element */}
<div className="absolute bottom-8 left-8">
  <div className="relative p-10 bg-green-700 rounded-lg shadow-lg">
    <div className="p-8 bg-green-500 rounded-lg shadow-lg">
      <div className="p-6 bg-green-300 rounded-lg shadow-lg">
        <p className="text-white font-semibold text-xl">Bottom Left Item</p>
      </div>
    </div>
  </div>
</div>

{/* Bottom Right Element */}
<div className="absolute bottom-8 right-8">
  <div className="relative p-10 bg-red-700 rounded-lg shadow-lg">
    <div className="p-8 bg-red-500 rounded-lg shadow-lg">
      <div className="p-6 bg-red-300 rounded-lg shadow-lg">
        <p className="text-white font-semibold text-xl">Bottom Right Item</p>
      </div>
    </div>
  </div>
</div>
<div className='absolute top-20 items-start justify-center'>
    <h1 className='font-extrabold text-6xl text-white mt-5'>
      Welcome to Your Taxi App
    </h1>
</div>


  {/* Content Container */}
  <div className="relative max-w-lg text-center bg-teal-400 text-white p-8 rounded-lg shadow-2xl backdrop-blur-md bg-opacity-60">
    <div className="relative max-w-3xl text-center bg-blue-700 text-white p-8 rounded-lg shadow-2xl backdrop-blur-md bg-opacity-60">
      <div className="relative max-w-2xl text-center bg-purple-600 text-white p-8 rounded-lg shadow-2xl backdrop-blur-md bg-opacity-60">
        {/* Taxi Icon */}
        <FaTaxi className="text-yellow-500 mx-auto text-6xl mb-4 animate-bounce" />

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-4 animate-fadeIn">Login here to book a Taxi App</h1>

        {/* Description */}
        <p className="text-xl text-slate-300 mb-6 animate-fadeIn">
          Reliable rides at your fingertips. Book a ride now and experience seamless travel.
        </p>

        <section>
          {/* Animated Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <FaTaxi className="text-red-400 mx-auto text-6xl mb-4 animate-bounce" />
            <div className="w-12 h-12 bg-purple-600 opacity-5 absolute rounded-full animate-pulse"></div>
            <div className="w-24 h-24 bg-blue-700 opacity-20 absolute rounded-full animate-pulse"></div>
            <div className="w-48 h-48 bg-teal-400 opacity-10 absolute rounded-full animate-pulse"></div>
            <div className="w-60 h-60 bg-slate-950 opacity-10 rounded-full animate-pulse"></div>
            <FaTaxi className="text-orange-400 mx-auto text-6xl mb-4 animate-bounce" />
          </div>
          </section>
          </div>
          <div>
            {/* Call to Action Buttons */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/create-ride"
                  className="bg-gray-700 text-blue-200 hover:bg-blue-900 text-lg font-bold py-3 px-8 rounded-full inline-block transition duration-300 transform hover:scale-105"
                >
                  Book a Ride
                </Link>

                <Link
                  to="/dashboard-stats"
                  className="bg-gray-700 text-blue-200 hover:bg-blue-900 text-lg font-bold py-3 px-8 rounded-full inline-block transition duration-300 transform hover:scale-105"
                >
                  Check Dashboard
                </Link>
                <Link
                  to="/list-rides"
                  className="bg-gray-700 text-blue-200 hover:bg-blue-900 text-lg font-bold py-3 px-8 rounded-full inline-block transition duration-300 transform hover:scale-105"
                >
                  List Ride
                </Link>

                <Link
                  to="/geocode"
                  className="bg-gray-700 text-blue-200 hover:bg-blue-900 text-lg font-bold py-3 px-8 rounded-full inline-block transition duration-300 transform hover:scale-105"
                >
                  Geocode
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-gray-700 text-blue-200 hover:bg-blue-900 text-lg font-bold py-3 px-8 rounded-full inline-block transition duration-300 transform hover:scale-105"
              >
                Login to Access
              </Link>
            )}
          </div>


    </div>
  </div>
</div>

  );
};

export default Home;
