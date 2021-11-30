const asyncWrapper = require('../../middleware/async');
const { StstusCode } = require('http-status-codes');
const User = require('../../models/User');

exports.post_register = asyncWrapper(async (req, res) => {
  console.log(req.body);
  const user = await User.create(req.body);
  console.log('222222');
  res.status(StstusCode.CREATED).json(user);
});

exports.post_login = asyncWrapper(async (req, res) => {
  res.send('login user');
});
