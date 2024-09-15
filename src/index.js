import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox CSS
import { RideProvider } from './contexts/RideContext';
import { AuthProvider } from './contexts/AuthContext';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe object with your publishable key from environment variables
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RideProvider>
        {/* Wrap the entire app with the Elements provider to ensure Stripe context is available throughout the app */}
        {/* <Elements stripe={stripePromise}> */}
          <App />
        {/* </Elements> */}
      </RideProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
