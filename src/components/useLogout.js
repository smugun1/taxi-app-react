import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Clear authentication tokens or session
    localStorage.removeItem('access_token'); // or any other token storage mechanism

    // Optionally, add more cleanup logic if necessary

    // Navigate to the login page after logging out
    navigate('/login');
  };

  return logout;
};

export default useLogout;
