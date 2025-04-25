import Stripe from 'stripe';
import dotenv from 'dotenv';
import { sendEmailReceipt } from '../utils/sendEmail.js';
import { Payment } from '../models/Payment.js'; 

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia; custom_checkout_beta=v1;',
});

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('✅ Payment succeeded! Session:', session);

    const email = 'farochkin@engineer.com'; // пока фиксированный email
    const amount = session.amount_total / 100;
    const transactionId = session.id;
    const subject = 'Tutoring Session'; // временно фиксировано

    // 💾 Сохраняем в базу
    try {
      await Payment.create({
        email,
        subject,
        amount,
        paymentStatus: session.payment_status || 'paid',
        transactionId,
      });
      console.log('💾 Payment saved to DB');
    } catch (err) {
      console.error('❌ Failed to save payment:', err);
    }

    // 📧 Отправляем email
    await sendEmailReceipt({
      to: email,
      subject: 'Payment Receipt',
      html: `
        <h2>Thank you for your payment!</h2>
        <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `,
    });
  }

  res.status(200).send('Webhook received');
};
