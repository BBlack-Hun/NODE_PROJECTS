const Product = require('../../models/Product');
const { StatusCodes } = require('http-status-codes');
const asyncWrapper = require('../../middleware/async');

exports.post_create_product = asyncWrapper(async (req, res) => {
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json(product);
});

exports.get_all_products = asyncWrapper(async (req, res) => {
  res.send('list of products');
});

exports.post_upload_image = asyncWrapper(async (req, res) => {
  req.body.image = req.file ? req.file.filename : '';
  console.log(req);
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/images/${req.body.image}` } });
});
