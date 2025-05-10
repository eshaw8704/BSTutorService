import { sendEmailReceipt } from '../utils/sendEmail.js';

export const manualSendReceipt = async (req, res) => {
  try {
    const { email, subject, amount, transactionId } = req.body;

    if (!email || !subject || !amount || !transactionId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await sendEmailReceipt({
      to: email,
      subject: 'Payment Receipt',
      html: `
        <h2>Thank you for your payment!</h2>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Amount:</strong> $${parseFloat(amount).toFixed(2)}</p>
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    res.json({ message: 'Receipt email sent successfully' });
  } catch (err) {
    console.error('❌ Failed to send manual receipt:', err);
    res.status(500).json({ error: 'Email sending failed' });
  }
};