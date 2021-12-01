const User = require('../../models/User');
const asyncWrapper = require('../../middleware/async');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

exports.post_register = asyncWrapper(async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
      httpOnly: true,
    },
  );
  res.status(StatusCodes.CREATED).json({ token });
});

exports.post_login = asyncWrapper(async (req, res) => {
  res.send('login user');
});
