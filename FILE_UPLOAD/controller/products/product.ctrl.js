const Product = require('../../models/Product');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../../middleware/async');
const BadRequestError = require('../../errors/bad-request');

exports.post_create_product = asyncWrapper(async (req, res) => {
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json(product);
});

exports.get_all_products = asyncWrapper(async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
});

exports.post_upload_image = asyncWrapper(async (req, res) => {
  const maxSize = 1000;
  if (!req.file) {
    throw new BadRequestError('No file uploaded!');
  }
  if (!req.file.mimetype.startsWith('image')) {
    throw new BadRequestError('Please Upload Image');
  }

  if (req.file.size > maxSize) {
    throw new BadRequestError('Please upload image smaller 1KB');
  }

  req.body.image = req.file ? req.file.filename : '';
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${req.body.image}` } });
});
