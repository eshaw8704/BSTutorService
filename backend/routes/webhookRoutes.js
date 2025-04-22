import express from 'express';
import { handleStripeWebhook } from '../controllers/webhookController.js';
import bodyParser from 'body-parser';

const router = express.Router();


router.post('/webhook', bodyParser.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
