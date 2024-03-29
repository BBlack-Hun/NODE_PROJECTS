const sendEmail = require('./sendEmail');
const asyncWrapper = require('../middleware/async');

const sendResetPasswordEmail = asyncWrapper(
  async ({ name, email, token, origin }) => {
    const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;

    const message = `<p>Please reset password by clicking on following link : <a href=${resetURL}>Reset Password</a></p>`;
    return sendEmail({
      to: email,
      subject: 'Reset Password',
      html: `<h4> Hello, ${name}</h4>
        ${message}`,
    });
  },
);

module.exports = sendResetPasswordEmail;
