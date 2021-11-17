const asyncWrapper = require('../../middleWare/async');

exports.get_products = asyncWrapper(async (req, res) => {
  res.status(200).json({ msg: 'all products' });
});

exports.create_product = asyncWrapper(async (req, res) => {
  res.status(200).json();
});

exports.get_product = asyncWrapper(async (req, res) => {
  res.status(200).json();
});

exports.update_product = asyncWrapper(async (req, res) => {
  res.status(200).json();
});

exports.delete_product = asyncWrapper(async (req, res) => {
  res.status(200).json();
});
