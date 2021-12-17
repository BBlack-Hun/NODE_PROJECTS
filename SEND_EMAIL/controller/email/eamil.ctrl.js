const nodemailer = require('nodemailer');
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
