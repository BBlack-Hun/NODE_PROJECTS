const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');
const asyncWrapper = require('../middleware/async');

const sendEmail = asyncWrapper(async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return await transporter.sendMail({
    from: `"king Mumnu" <wjdgns6102@gmail.com>`, // sender address
    to,
    subject,
    html,
  });
});

module.exports = sendEmail;
