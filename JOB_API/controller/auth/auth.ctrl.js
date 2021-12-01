const User = require('../../models/User');
const asyncWrapper = require('../../middleware/async');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');

exports.post_register = asyncWrapper(async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(user);
});

exports.post_login = asyncWrapper(async (req, res) => {
  res.send('login user');
});
