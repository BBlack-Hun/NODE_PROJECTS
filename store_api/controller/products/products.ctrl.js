const Product = require('../../models/Product');
const asyncWrapper = require('../../middleWare/async');

exports.get_products_static = asyncWrapper(async (req, res) => {
  const products = await Product.find({
    page: '2',
  });
  res.status(200).json({ products, hbHits: products.length });
});

exports.get_products = asyncWrapper(async (req, res) => {
  const { featured } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);
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
