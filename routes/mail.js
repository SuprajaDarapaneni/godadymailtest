const express = require('express');
const router = express.Router();
const transporter = require('../config/mailer');

const DEBUG = process.env.DEBUG === 'true'; // Enable by setting DEBUG=true in .env

router.post('/send-mail', async (req, res) => {
  const { to, subject, message } = req.body;

  if (DEBUG) {
    console.log('🔍 Incoming request:', { to, subject, message });
  }

  if (!to || !subject || !message) {
    if (DEBUG) console.log('❌ Missing required fields');
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const info = await transporter.sendMail({
      from: `"AGX Mailer" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: message
    });

    if (DEBUG) {
      console.log('✅ Email sent:', info);
    }

    res.status(200).json({ message: 'Email sent successfully!', info });
  } catch (error) {
    console.error('💥 Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.', details: error.message });
  }
});

module.exports = router;
