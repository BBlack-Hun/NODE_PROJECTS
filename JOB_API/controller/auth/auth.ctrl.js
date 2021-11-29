const asyncWrapper = require('../../middleware/async');

exports.post_register = asyncWrapper(async (req, res) => {
  res.send('register user');
});

exports.post_login = asyncWrapper(async (req, res) => {
  res.send('login user');
});
