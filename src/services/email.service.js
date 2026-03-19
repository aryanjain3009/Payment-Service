require('dotenv').config();
const nodemailer = require('nodemailer');


// we use transporter to send email to SMTP server
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Payment Service" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail (userEmail, name){
    const subject = "Welcome to payment service";
    const text = `Hi ${name}, 
    Thank you for registering with payment service. \n Your account has been created successfully. \n You can now login to your account using your email and password.`;
    const html = `<h1>Hi ${name},</h1>
    <p>Thank you for registering with payment service. </p>
    <p>Your account has been created successfully. </p>
    <p>You can now login to your account using your email and password.</p>`;
    await sendEmail(userEmail, subject, text, html);
}

module.exports = {sendRegistrationEmail, sendEmail, transporter};   