const asyncWrapper = require('../../middleware/async');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const { checkPermissions } = require('../../utils');

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'someRandomValue';
  return { client_secret, amount };
};

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
  // calculate total
  const total = tax + shippingFee + subtotal;
  // get client secret
  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd',
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });
  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret });
});

exports.get_allOrders = asyncWrapper(async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
});

exports.get_currentUserOrders = asyncWrapper(async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
});

exports.get_singleOrder = asyncWrapper(async (req, res) => {
  const { id: orderId } = req.params;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.notFoundError(`No order with id: ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(StatusCodes.OK).json({ order });
});

exports.patch_updateOrder = asyncWrapper(async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;
  const order = await Order.findOne({ _id: orderId });
  if (!order) {
    throw new CustomError.notFoundError(`No order with id: ${orderId}`);
  }
  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = 'paid';
  await order.save();

  res.status(StatusCodes.OK).json({ order });
});
