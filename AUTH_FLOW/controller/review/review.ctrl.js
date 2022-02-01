const Review = require('../../models/Review');
const Product = require('../../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const { checkPermissions } = require('../../utils');
const asyncWrapper = require('../../middleware/async');

exports.post_createReview = asyncWrapper(async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new CustomError.notFoundError(`No product with id : ${productId}`);
  }

  const alreadySubmited = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmited) {
    throw new CustomError.badRequestError(
      'Already submited review for this product ',
    );
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
});

exports.get_AllReviews = asyncWrapper(async (req, res) => {
  const reviews = await Review.find({});

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
});

exports.get_SingleReview = asyncWrapper(async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.notFoundError(`No review with id ${review}`);
  }

  res.status(StatusCodes.OK).json({ review });
});

exports.update_Review = asyncWrapper(async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.notFoundError(`No review with id ${review}`);
  }

  checkPermissions(req.user, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  res.status(StatusCodes.OK).json({ review });
});

exports.delete_Review = asyncWrapper(async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.notFoundError(`No review with id ${review}`);
  }

  checkPermissions(req.user, review.user);

  await review.remove();

  res.status(StatusCodes.OK).json({ msg: `Success! Review Removed` });
});
