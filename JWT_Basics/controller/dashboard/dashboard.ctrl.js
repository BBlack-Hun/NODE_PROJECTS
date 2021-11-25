const asyncWrapper = require('../../middleWare/async');

exports.get_dashboard = asyncWrapper(async (req, res) => {
  console.log(req.user);

  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
});
