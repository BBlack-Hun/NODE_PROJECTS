const nodemailer = require('nodemailer');
const asyncWrapper = require('../middleware/async');

const sendEmail = asyncWrapper(async () => {
  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'troy.gutmann61@ethereal.email',
      pass: 'uacx5eK1Rjzr3gw2Rc',
    },
  });

  let info = await transporter.sendMail({
    from: `"coding addict" <codingddict@gmail.com>`,
    to: 'bar@example.com',
    subject: 'hello',
    html: '<h2>Sending on nodejs</h2>',
  });
});

module.exports = sendEmail;
