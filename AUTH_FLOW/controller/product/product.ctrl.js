const asyncWrapper = require('../../middleware/async');
const Product = require('../../models/Product');
const CustomError = require('../../errors');
const {
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
} = require('../../utils');
const { StatusCodes } = require('http-status-codes');

exports.createProduct = asyncWrapper(async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
});

exports.getAllProducts = asyncWrapper(async (req, res) => {
  const product = await Product.find({});

  res.status(StatusCodes.OK).json({ product, count: product.length });
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
