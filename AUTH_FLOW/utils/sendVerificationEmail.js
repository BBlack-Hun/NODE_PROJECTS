const sendEmail = require('./sendEmail');
const asyncWrapper = require('../middleware/async');

const sendVerificationEmail = asyncWrapper(
  async ({ name, email, verificationToken, origin }) => {
    const message =
      '<p>Please confirm your email by clicking on the following link :</p>';
    return sendEmail({
      to: email,
      subject: 'Email Con',
      html: `<h4> Hello, ${name}</h4>
      ${message}`,
    });
  },
);

module.exports = sendVerificationEmail;
