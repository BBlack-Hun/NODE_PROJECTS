const User = require('../../models/User');
const asyncWrapper = require('../../middleware/async');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../../error/bad-request');
const { Unauthenticated } = require('../../error/unauthenticated');

exports.post_register = asyncWrapper(async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
});

exports.post_login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });
  // compare password
  if (!user) {
    throw new Unauthenticated('Invalid Credentials');
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
});
