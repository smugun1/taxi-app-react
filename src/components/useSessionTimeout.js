import { useEffect } from 'react';
import useLogout from './useLogout'; // Import the centralized logout hook

const useSessionTimeout = (timeoutDuration = 30 * 60 * 1000) => { // Example: 30 minutes
  const logout = useLogout(); // Get the logout function

  useEffect(() => {
    const handleTimeout = () => {
      logout(); // Call logout after timeout
    };

    const timeout = setTimeout(handleTimeout, timeoutDuration);

    return () => clearTimeout(timeout); // Clear timeout if component unmounts or timeout resets
  }, [timeoutDuration, logout]);
};

export default useSessionTimeout;
