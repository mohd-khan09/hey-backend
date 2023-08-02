// Import required packages
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

// Configure your Nodemailer settings
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Replace with your SMTP server (e.g., Gmail, Outlook)
  port:  587, // Replace with the SMTP port
  secure: false,
  auth: {
    user: "***********", // Replace with your email address
    pass: "*********", // Replace with your email password
  },
});

// Allow CORS to allow cross-origin communication
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Parse incoming JSON data
app.use(express.json());

// Define the endpoint to handle form submissions
app.post('/send-message', (req, res) => {
  const { name, subject, email, message } = req.body;

  // Compose the email content
  const mailOptions = {
    from: email,
    to: "********", // Replace with your email address to receive the messages
    subject: `Contact Form Submission - ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to send the message.' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Message sent successfully.' });
    }
  });
});

// Start the server
const port = 3000; // Replace with your desired port number
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
