const asyncWrapper = require('../../middleware/async');
const User = require('../../models/User');
const CustomError = require('../../errors');
const { StatusCodes } = require('http-status-codes');

exports.get_AllUsers = asyncWrapper(async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ users, count: users.length });
});

exports.get_SingleUser = asyncWrapper(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select('-password');

  if (!user) {
    throw new CustomError.notFoundError(`No user with id : ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
});

exports.get_ShowCurrentUser = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
});

exports.patch_updateUser = asyncWrapper(async (req, res) => {
  res.send(req.body);
});

exports.patch_updateUserPassword = asyncWrapper(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.badRequestError('please provide both values');
  }
  console.log(req.user);
  const user = await User.findOne({ _id: req.user.userId });

  console.log(user);

  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new CustomError.unAuthenticatedError('Invalid Credentials');
  }

  user.password = newPassword;

  await user.save();
  res.status(StatusCodes.OK).json({ msg: 'Succcess! Password Updated!' });
});
