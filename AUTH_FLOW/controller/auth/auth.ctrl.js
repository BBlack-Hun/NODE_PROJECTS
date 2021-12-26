const asyncWrapper = require('../../middleware/async');

exports.post_register = asyncWrapper(async (req, res) => {
  res.sned('register');
});

exports.post_login = asyncWrapper(async (req, res) => {
  res.sned('register');
});

exports.get_logout = asyncWrapper(async (req, res) => {
  res.sned('register');
});
