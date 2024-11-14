const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'tunglamnu1@gmail.com', 
    pass: 't k o b s t c s j j d z m q t l',  
  },
});

const sendVerificationEmail = (email, verificationLink) => {
  const mailOptions = {
    from: 'tunglamnu1@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: ${verificationLink}`,
  };

  return transporter.sendMail(mailOptions);
};

const sendTemporaryPasswordEmail = (email, temporaryPassword) => {
  const mailOptions = {
    from: 'tunglamnu1@gmail.com',
    to: email,
    subject: 'Temporary Password',
    text: `Your temporary password is: ${temporaryPassword}. Please use this password to log in and reset your password.`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail, sendTemporaryPasswordEmail };
