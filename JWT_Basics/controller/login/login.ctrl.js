const asyncWrapper = require('../../middleWare/async');
const { BadRequestError } = require('../../error/bad-request');
const jwt = require('jsonwebtoken');

exports.post_login = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;
  // mongoose validation
  // Joi
  // check in the controller

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password', 400);
  }
  // just for demo, normally provided by DB!!!
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ msg: 'user created', token });
});
