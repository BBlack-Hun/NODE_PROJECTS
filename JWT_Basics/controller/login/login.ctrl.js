const asyncWrapper = require('../../middleWare/async');
const CustomApiError = require('../../error/coustom-error');

exports.post_login = asyncWrapper((req, res) => {
  const { username, password } = req.body;
  // mongo
  // joi
  // check in the controller

  if (!username || !password) {
    throw new CustomApiError('Please provide email and password', 400);
  }

  res.send('Fake Login/Register/Signup Route');
});
