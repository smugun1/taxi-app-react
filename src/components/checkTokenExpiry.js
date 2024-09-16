import jwtDecode from 'jwt-decode';
import useLogout from './useLogout';

const checkTokenExpiry = () => {
  const token = localStorage.getItem('access_token');
  if (token) {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decoded.exp < currentTime) {
      return true; // Token has expired
    }
  }
  return false;
};

const App = () => {
  const logout = useLogout();

  useEffect(() => {
    if (checkTokenExpiry()) {
      logout(); // Log out if the token is expired
    }
  }, [logout]);

  return (
    <div>
      {/* Your App Components */}
      <Users />
      <AddUserForm />
      <UserTable />
      <AddDriverLicence />
      <AddVehicle />
      <AddRide />
      <AddLocation />
      <AddTransaction />
      <CreateRide />
      <ListRides />
      <AcceptRide />
      <CompleteRide />
    </div>
  );
};

export default App;
