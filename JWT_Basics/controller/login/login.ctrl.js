const asyncWrapper = require('../../middleWare/async');

exports.post_login = asyncWrapper((req, res) => {
  res.send('Fake Login/Register/Signup Route');
});
