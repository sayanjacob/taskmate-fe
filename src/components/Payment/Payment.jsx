import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          // Include billing details
        },
      },
    });

    if (error) {
      setError(`Payment failed: ${error.message}`);
    } else {
      // Payment successful, confirm payment on backend
      const response = await axios.post('/confirm-payment');
      console.log(response.data.message); // Payment confirmed!
    }
  };

  const handleCreatePaymentIntent = async () => {
    // Fetch client secret from the server
    const response = await axios.post('/create-payment-intent', { amount: 1000 }); // Pass the amount
    setClientSecret(response.data.clientSecret);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
