import React from 'react';
import useLogout from './useLogout'; // Import the centralized logout hook

const LogoutButton = () => {
  const logout = useLogout(); // Get the logout function

  return (
    <button
      onClick={logout} // Call logout on button click
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
