import nodemailer from 'nodemailer';

export const sendEmailReceipt = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME, // email
      pass: process.env.EMAIL_PASSWORD, // Gmail App Password
    },
  });

  const mailOptions = {
    from: `"BSTutor" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    html,
  };

  try {
    console.log("📨 Preparing to send email to", to); // ✅ Added logging
    await transporter.sendMail(mailOptions);
    console.log('📬 Email sent to', to);
  } catch (error) {
    console.error('❌ Failed to send email:', error.response || error.message || error);
  }
};
