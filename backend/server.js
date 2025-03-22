const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config({ path: './test.env' });

const app = express();

app.use(bodyParser.json());
app.use(cors());

const adminEmails = ['asilva5@gaels.iona.edu'];

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

app.post('/api/auth/signin', (req, res) => {
  const { email } = req.body;
  if (email.endsWith('@iona.edu') || email.endsWith('@gaels.iona.edu')) {
    const isAdmin = adminEmails.includes(email);
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: isAdmin ? 'Admin Access to CRUD Page' : 'Welcome to the App',
      text: isAdmin
        ? 'You have been granted access to the admin dashboard. Click the link to access: http://your-crud-page-url.com'
        : 'Thank you for registering. Click the link to verify your email: http://your-verification-url.com',
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error sending email' });
      }
      res.json({ email, isAdmin });
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.post('/api/auth/signout', (req, res) => {
  // Handle sign-out logic here
  res.json({ message: 'Signed out' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});