import React from 'react';
import { CheckoutProvider } from '@stripe/react-stripe-js';
import stripe from '../stripe';
import CheckoutForm from './CheckoutForm';
import axios from 'axios';

const CheckoutPage = () => {
  const fetchClientSecret = () => {
    return axios.post('/api/create-checkout-session')
      .then((res) => res.data.checkoutSessionClientSecret);
  };

  return (
    <CheckoutProvider
      stripe={stripe}
      options={{ fetchClientSecret }}
    >
      <CheckoutForm />
    </CheckoutProvider>
  );
};

export default CheckoutPage;
