const Product = require('../../models/Product');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../../middleware/async');

exports.post_create_product = asyncWrapper(async (req, res) => {
  res.send('create product');
});

exports.get_all_products = asyncWrapper(async (req, res) => {
  res.send('list of products');
});

exports.post_upload_image = asyncWrapper(async (req, res) => {
  res.send('upload product image');
});
