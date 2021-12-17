const asyncWrapper = require('../../middleware/async');

exports.get_send_email = asyncWrapper(async (req, res) => {
  res.send('send email func');
});
