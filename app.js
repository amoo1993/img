const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
// Define a route to render the form
app.get('/', (req, res) => {
  res.render('index', {successMessage: null});
});

// Define a route to handle form submissions send email
app.post('/send-email', (req, res) => {
  const { nameE, emailE, messageE, subjectE } = req.body;
  
  // Configure nodemailer to send emails (replace with your own email provider details)
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port:587,

    auth: {
      user: 'info@alrushdcargo.ae', // Replace with your email
      pass: 'Info@2023', // Replace with your password or use an app-specific password
    },
  });
  
  const mailOptions = {
    from: 'info@alrushdcargo.ae', // Replace with your email
    to: 'info@alrushdcargo.ae', // Replace with the destination email
    subject: subjectE,
    text: `Name: ${nameE}\nEmail: ${emailE}\nMessage: ${messageE}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error.message);
    }
    console.log('Email sent:', info.response);
    res.render('index', { successMessage: 'The email have been sent successful' });
  });
});

// Define a route to handle form submissions send quote
app.post('/send-quote', (req, res) => {
  const { nameQ, emailQ, mobileQ, serviceQ, noteQ } = req.body;
  
  // Configure nodemailer to send emails (replace with your own email provider details)
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port:587,

    auth: {
      user: 'sales@alrushdcargo.ae', // Replace with your email
      pass: 'Sales@2023', // Replace with your password or use an app-specific password
    },
  });
  
  const mailOptions = {
    from: 'sales@alrushdcargo.ae', // Replace with your email
    to: 'sales@alrushdcargo.ae', // Replace with the destination email
    subject: 'Request of Qoute',
    text: `Name: ${nameQ}\nEmail: ${emailQ}\nMessage: ${mobileQ}\nService: ${serviceQ}\nNote: ${noteQ}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error.message);
    }
    console.log('Email sent:', info.response);
    res.render('index', { successMessage: 'The email have been sent successful' });
  });
});
const port =  3000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
