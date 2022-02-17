const nodemailer = require('nodemailer');
const asyncWrapper = require('../middleware/async');

const sendEmail = asyncWrapper(async () => {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'arnaldo.bernier25@ethereal.email',
      pass: 'HUa4WbTK18uhn6WkKC',
    },
  });

  let info = await transporter.sendMail({
    from: `"coding addict" <codingddict@gmail.com>`,
    to: 'user@user.com',
    subject: 'Heloo World!',
    html: '<h2>Sending on nodejs</h2>',
  });
});

module.exports = sendEmail;
