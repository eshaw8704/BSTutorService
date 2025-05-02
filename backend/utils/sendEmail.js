import nodemailer from 'nodemailer';

export const sendEmailReceipt = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"BSTutor" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('📬 Email sent to', to);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
};
