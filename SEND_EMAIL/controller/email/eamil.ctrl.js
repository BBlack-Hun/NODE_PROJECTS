const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const asyncWrapper = require('../../middleware/async');

exports.get_send_email = asyncWrapper(async (req, res) => {
  let testAccount = nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'conner.sipes37@ethereal.email',
      pass: 'mqHmB6Kn8rTXe7wA4y',
    },
  });

  let info = await transporter.sendMail({
    from: `"coding addict" <codingddict@gmail.com>`,
    to: 'bar@example.com',
    subject: 'hello',
    html: '<h2>Sending on nodejs</h2>',
  });
  res.json(info);
});

exports.get_send_email2 = asyncWrapper(async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'h1103j@naver.com', // Change to your recipient
    from: 'h1103j@kangwon.ac.kr', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  const info = await sgMail.send(msg);

  res.json(info);
});
