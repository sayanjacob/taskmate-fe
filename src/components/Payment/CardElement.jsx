// PaymentForm.js

import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './Checkoutform'; // Your payment form component

const stripePromise = loadStripe('your_stripe_public_key');

const PaymentFormWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentFormWrapper;
