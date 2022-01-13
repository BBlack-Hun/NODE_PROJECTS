const asyncWrapper = require('../../middleware/async');

exports.createProduct = asyncWrapper(async (req, res) => {
  res.send('create Product');
});

exports.getAllProducts = asyncWrapper(async (req, res) => {
  res.send('get All Products');
});

exports.getSingleProduct = asyncWrapper(async (req, res) => {
  res.send('get single Product');
});

exports.updateProduct = asyncWrapper(async (req, res) => {
  res.send('update Product');
});

exports.deleteProduct = asyncWrapper(async (req, res) => {
  res.send('delete Product');
});

exports.updateImage = asyncWrapper(async (req, res) => {
  res.send('update Product image');
});
