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

      {/* Content Container */}
      <div className="relative max-w-lg text-center text-white p-8 rounded-lg shadow-2xl backdrop-blur-md bg-opacity-60">
        {/* Taxi Icon */}
        <FaTaxi className="mx-auto text-6xl mb-4 animate-bounce" />

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-4 animate-fadeIn">Welcome to Your Taxi App</h1>

        {/* Description */}
        <p className="text-lg mb-6 animate-fadeIn">
          Reliable rides at your fingertips. Book a ride now and experience seamless travel.
        </p>

        <section>
          {/* Animated Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-teal-500 opacity-20 rounded-full animate-pulse"></div>
            <div className="w-48 h-48 bg-slate-800 opacity-10 absolute rounded-full animate-pulse"></div>
          </div>

          <div>
            {/* Call to Action Buttons */}
            {isAuthenticated ? (
              <>
                <Link
                  to="/create-ride"
                  className="bg-white text-blue-500 hover:bg-blue-300 text-lg font-bold py-3 px-8 rounded-full
                  inline-block transition duration-300 transform hover:scale-105"
                >
                  Book a Ride
                </Link>

                <Link
                  to="/dashboard-stats"
                  className="bg-white text-blue-500 hover:bg-blue-300 text-lg font-bold py-3 px-8 rounded-full
                  inline-block transition duration-300 transform hover:scale-105"
                >
                  Check Dashboard
                </Link>
                <Link
                  to="/list-rides"
                  className="bg-white text-blue-500 hover:bg-blue-300 text-lg font-bold py-3 px-8 rounded-full
                  inline-block transition duration-300 transform hover:scale-105"
                >
                  List Ride
                </Link>

                <Link
                  to="/geocode"
                  className="bg-white text-blue-500 hover:bg-blue-300 text-lg font-bold py-3 px-8 rounded-full
                  inline-block transition duration-300 transform hover:scale-105"
                >
                  Geocode
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-white text-blue-500 hover:bg-blue-300 text-lg font-bold py-3 px-8 rounded-full
                inline-block transition duration-300 transform hover:scale-105"
              >
                Login to Access
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
