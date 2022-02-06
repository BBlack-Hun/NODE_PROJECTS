const asyncWrapper = require('../../middleware/async');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const { checkPermissions } = require('../../utils');

exports.post_createOrder = asyncWrapper(async (req, res) => {
  // most complex
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new CustomError.badRequestError('No cart items provided');
  }

  if (!tax || !shippingFee) {
    throw new CustomError.badRequestError(
      'Please provide tax and Shipping fee',
    );
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      throw new CustomError.badRequestError(
        `No provide with id : ${item.product}`,
      );
    }
    const { name, price, image, _id } = dbProduct;
    console.log(name, price, image);
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };
    // add item to order
    orderItems = [...orderItems, singleOrderItem];
    // calculate subtotal
    subtotal += item.amount * price;
  }
  console.log(orderItems);
  console.log(subtotal);
  res.send('create Order');
});

exports.get_allOrders = asyncWrapper(async (req, res) => {
  res.send('get all orders');
});

exports.get_currentUserOrders = asyncWrapper(async (req, res) => {
  res.send('get current User orders');
});

exports.get_singleOrder = asyncWrapper(async (req, res) => {
  res.send('get single order');
});

exports.patch_updateOrder = asyncWrapper(async (req, res) => {
  res.send('update order');
});
