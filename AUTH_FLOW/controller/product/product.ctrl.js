const asyncWrapper = require('../../middleware/async');
const Product = require('../../models/Product');
const CustomError = require('../../errors');
const path = require('path');
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
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.notFoundError(`No Product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
});

exports.updateProduct = asyncWrapper(async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: ture,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.notFoundError(`No Product with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
});

exports.deleteProduct = asyncWrapper(async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.notFoundError(`No Product with id : ${productId}`);
  }

  await product.remove();
  res.status(StatusCodes.OK).json({ msg: `Success! product removed!` });
});

exports.updateImage = asyncWrapper(async (req, res) => {
  if (!req.file) {
    throw new CustomError.badRequestError('No File Uploaded');
  }

  const productImage = req.file ? req.file.filename : '';

  const imagePath = path.join(
    __dirname,
    '../../public/uploads' + `${productImage}`,
  );

  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage}` });
});
