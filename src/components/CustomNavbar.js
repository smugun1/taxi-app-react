import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import the context
import { useNavigate } from 'react-router-dom';

const CustomNavbar = () => {
    const { isAuthenticated, logout } = useAuth(); // Access authentication status
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    console.log('isAuthenticated:', isAuthenticated); // Log isAuthenticated for debugging

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear token or authentication details
        localStorage.removeItem('authToken'); // Or however you're storing tokens
        navigate('/login'); // Redirect to login page after logging out
    };

    return (
        <nav className="bg-gray-100 shadow-md">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button */}
                        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-100" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            {/* Icon when menu is closed */}
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {/* Icon when menu is open */}
                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-xl font-bold text-gray-800">
                                The Taxi app
                            </Link>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Home
                                </Link>
                                {isAuthenticated && (
                                    <>
                                        <Link to="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                            About
                                        </Link>
                                        <Link to="/dashboard-stats" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                            Dashboard
                                        </Link>
                                        <Link to="/geocode" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                            Geocode
                                        </Link>
                                        <Link to="/map-with-header" className="text-gray-600 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                                            Map With Header
                                        </Link>
                                        <div className="relative">
                                            <button type="button" onClick={toggleDropdown} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-100" aria-expanded={isDropdownOpen ? "true" : "false"}>
                                                <span>Dropdown</span>
                                                {/* Dropdown arrow */}
                                                <svg className={`h-5 w-5 inline-flex ml-2 -mr-1 text-gray-400 ${isDropdownOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L10 5.414 6.707 8.707a1 1 0 01-1.414-1.414l4-4A1 1 0 0110 3z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            {isDropdownOpen && (
                                                <div className="absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg origin-top-left ring-1 ring-black ring-opacity-5 divide-y divide-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                    <div className="py-1">
                                                        <Link to="/map-with-header" className="text-gray-600 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                                                            Map With Header
                                                        </Link>
                                                        <Link to="/dashboard-stats" className="text-gray-600 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                                                            Dashboard
                                                        </Link>
                                                        <Link to="/payment-intent" className="text-gray-600 block px-4 py-2 text-sm hover:bg-gray-100" role="menuitem">
                                                            Payment
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                                <Link to="/register" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <button onClick={handleLogout} className="bg-orange-300 m-2 p-2 hover: divide-red-500 text-red-600 rounded-md">
                                    <Link to="/logout" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                        Logout
                                    </Link>
                                </button></>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default CustomNavbar;
