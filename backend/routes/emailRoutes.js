import express from 'express';
import { manualSendReceipt } from '../controllers/emailController.js';

const router = express.Router();

router.post('/send-receipt', manualSendReceipt);

export default router;