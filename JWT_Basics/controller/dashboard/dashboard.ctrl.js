const asyncWrapper = require('../../middleWare/async');

exports.get_dashboard = asyncWrapper((req, res) => {
  const luckyNumber = Math.random() * 100;
  res.json;
  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is yhour authorized data, your lucky number is ${luckyNumber}`,
  });
});
