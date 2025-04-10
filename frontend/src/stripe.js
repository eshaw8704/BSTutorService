import { loadStripe } from '@stripe/stripe-js';

const stripe = loadStripe("pk_test_51R7hqaQuG5SCDlJdaNVrgKuU6JCfb943KHx2x7FiVmG06thvtWPOPf1aFCSzIv3VQlIoL5kRu6oMik2MqMYIXsc900Q64xOlfi", {
  betas: ['custom_checkout_beta_6'],
});

export default stripe;
