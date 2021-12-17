const nodemailer = require('nodemailer');
const asyncWrapper = require('../../middleware/async');

exports.get_send_email = asyncWrapper(async (req, res) => {
  let testAccount = nodemailer.createTestAccount();
  res.send('send email func');
});
