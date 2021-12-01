const User = require('../../models/User');
const asyncWrapper = require('../../middleware/async');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');

exports.post_register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.getSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const tempUser = { name, email, password: hashedPassword };

  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json(user);
});

exports.post_login = asyncWrapper(async (req, res) => {
  res.send('login user');
});
