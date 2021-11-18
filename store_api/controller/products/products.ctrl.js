const Product = require('../../models/Product');
const asyncWrapper = require('../../middleWare/async');

exports.get_products_static = asyncWrapper(async (req, res) => {
  const products = await Product.find({
    name: 'vase table',
  });
  res.status(200).json({ products, hbHits: products.length });
});

exports.get_products = asyncWrapper(async (req, res) => {
  const products = await Product.find(req.query);
  res.status(200).json({ products, hbHits: products.length });
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
