import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia; custom_checkout_beta=v1;',
});

// This is for debugging purposes only
//console.log('Stripe initialized');

export const createCheckoutSession = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      ui_mode: 'custom',
      return_url: 'http://localhost:5173/success', // url of the frontend page to redirect to after payment
      customer_creation: 'always', 
    });
  
    res.json({ checkoutSessionClientSecret: session.client_secret });
  };
  
