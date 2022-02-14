const User = require('../../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const asyncWrapper = require('../../middleware/async');
const { attachCookiesToResponse, createTokenUser } = require('../../utils');
const crypto = require('crypto');

exports.post_register = asyncWrapper(async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.badRequestError('Email already exists');
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';

  const verificationToken = crypto.randomBytes(40).toString('hex');

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });
  // send verification token back only while testing in postman!!!
  // const tokenUser = createTokenUser(user);
  // attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.CREATED).json({
    msg: 'Success! Please check your email to verify account',
    verificationToken: user.verificationToken,
  });
});

exports.post_login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.badRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.unAuthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.unAuthenticatedError('Invalid Credentials');
  }

  if (!user.isVerified) {
    throw new CustomError.unAuthenticatedError('Please verify your email');
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
});

exports.get_logout = asyncWrapper(async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
});
