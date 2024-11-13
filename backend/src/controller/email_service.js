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

module.exports = { sendVerificationEmail };
