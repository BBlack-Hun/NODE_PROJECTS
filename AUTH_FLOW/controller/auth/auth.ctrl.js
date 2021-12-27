const User = require('../../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const asyncWrapper = require('../../middleware/async');

exports.post_register = asyncWrapper(async (req, res) => {
  const { email } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.badRequestError('Email already exists');
  }

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
});

exports.post_login = asyncWrapper(async (req, res) => {
  res.send('login user');
});

exports.get_logout = asyncWrapper(async (req, res) => {
  res.send('logout user');
});
