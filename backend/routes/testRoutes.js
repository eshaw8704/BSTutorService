import express from 'express';
import { sendEmailReceipt } from '../utils/sendEmail.js';

const router = express.Router();

router.get('/email-test', async (req, res) => {
  try {
    await sendEmailReceipt({
      to: 'your-email@gmail.com', // 🔁 Replace with your test email
      subject: '✅ Email Test - BSTutors',
      html: '<h3>This is a test email from your BSTutors backend 🚀</h3>',
    });

    res.json({ message: '📧 Test email sent!' });
  } catch (err) {
    console.error('❌ Email test failed:', err);
    res.status(500).json({ message: 'Email test failed' });
  }
});

export default router;
