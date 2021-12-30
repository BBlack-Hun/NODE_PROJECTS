const User = require('../../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const asyncWrapper = require('../../middleware/async');
const { createJWT } = require('../../utils');

exports.post_register = asyncWrapper(async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.badRequestError('Email already exists');
  }

  // first registered user is an admin
  const isFisrtAccount = (await User.countDocuments({})) === 0;
  const role = isFisrtAccount ? 'admin' : 'user';

  const user = await User.create({ name, email, password, role });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  const token = await createJWT({ payload: tokenUser });
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
});

exports.post_login = asyncWrapper(async (req, res) => {
  res.send('login user');
});

exports.get_logout = asyncWrapper(async (req, res) => {
  res.send('logout user');
});
