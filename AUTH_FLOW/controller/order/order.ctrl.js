const asyncWrapper = require('../../middleware/async');

exports.post_createOrder = asyncWrapper(async (req, res) => {
  res.send('create order');
});

exports.get_allOrders = asyncWrapper(async (req, res) => {
  res.send('get all orders');
});

exports.get_singleOrder = asyncWrapper(async (req, res) => {
  res.send('get single order');
});

exports.get_currentUserOrders = asyncWrapper(async (req, res) => {
  res.send('get current User orders');
});

exports.patch_updateOrder = asyncWrapper(async (req, res) => {
  res.send('update order');
});
