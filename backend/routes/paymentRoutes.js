import express from 'express';
import { createCheckoutSession } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSession);


//temporary test
router.get('/test', (req, res) => {
    res.send('Payment route is working');
  });


export default router;