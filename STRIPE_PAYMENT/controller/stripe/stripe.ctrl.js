const asyncWrapper = require('../../middleware/async');

exports.post_stripe = asyncWrapper(async (req, res) => {
  console.log(req.body);
  res.send('stripe route');
});
