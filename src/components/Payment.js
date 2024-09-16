import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const Payment = ({ amount }) => {
  const handleToken = async (token) => {
    try {
      const response = await axios.post('http://localhost:8000/api/payment-intent/', {
        token,
        amount,
      });
      if (response.status === 200) {
        console.log('Payment successful!');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_API_KEY} // Use the environment variable
        token={handleToken}
        amount={amount * 100}
        name="Taxi App"
        className="inline-block w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
      />
    </div>
  );
};

export default Payment;
