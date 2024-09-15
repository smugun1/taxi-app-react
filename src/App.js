import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import About from './components/About';
import MapComponent from './components/MapComponent';
import MapWithHeader from './components/MapWithHeader';
import Geocode from './components/Geocode';
import Dashboard from './components/Dashboard';
import CreateTransaction from './components/CreateTransaction';
import CreateRide from './components/CreateRide';
import CompleteRide from './components/CompleteRide';
// import Payment from './components/Payment';
import AcceptRide from './components/AcceptRide';
import ListTransactions from './components/ListTransactions';
import ListRides from './components/ListRides';
import UserManagement from './components/UserManagement';
import DriverLicenses from './components/DriverLicenses';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
import CustomNavbar from './components/CustomNavbar';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider


// Initialize Stripe with the public key
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
    return (
        <AuthProvider> {/* Wrap the whole app with AuthProvider */}
            <Router>
                <CustomNavbar />
                <div className="App">
                    <ErrorBoundary>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/map-component" element={<MapComponent />} />
                            <Route path="/map-with-header" element={<MapWithHeader />} />
                            <Route path="/geocode" element={<Geocode />} />
                            <Route path="/dashboard-stats" element={<Dashboard />} />
                            <Route path="/create-transaction" element={<CreateTransaction />} />
                            <Route path="/create-ride" element={<CreateRide />} />
                            <Route path="/accept-ride" element={<AcceptRide />} />
                            <Route path="/list-transactions" element={<ListTransactions />} />
                            <Route path="/list-rides" element={<ListRides />} />
                            <Route path="/complete-ride" element={<CompleteRide />} />
                            {/* Use Stripe Elements for the payment route */}
                            {/* <Route path="/payment" element={<Elements stripe={stripePromise}><Payment /></Elements>} /> */}
                            <Route path="/user-management" element={<UserManagement />} />
                            <Route path="/driver-licenses" element={<DriverLicenses />} />
                        </Routes>
                    </ErrorBoundary>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
