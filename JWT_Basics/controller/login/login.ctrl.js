const asyncWrapper = require('../../middleWare/async');

exports.post_login = asyncWrapper(async (req, res) => {
  res.send('Fake Login/Register/Signup Route');
});
