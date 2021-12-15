const Product = require('../../models/Product');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../../middleware/async');
const BadRequestError = require('../../errors/bad-request');
const cloudinary = require('cloudinary').v2;

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
  if (!req.file) {
    throw new BadRequestError('No file uploaded!');
  }
  req.body.image = req.file ? req.file.filename : '';
  const result = await cloudinary.uploader.upload(req.file.path, {
    use_filename: true,
    folder: 'file_uploads',
  });
  console.log(result);

  res.status(StatusCodes.OK).json({
    image: { src: `/uploads/${req.body.image}`, src2: result.secure_url },
  });
});
