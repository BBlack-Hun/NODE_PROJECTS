const Review = require('../../models/Review');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');
const asyncWrapper = require('../../middleware/async');

exports.post_createReview = asyncWrapper(async (req, res) => {
  res.send('create review');
});

exports.get_AllReviews = asyncWrapper(async (req, res) => {
  res.send('create review');
});

exports.get_SingleReview = asyncWrapper(async (req, res) => {
  res.send('create review');
});

exports.update_Review = asyncWrapper(async (req, res) => {
  res.send('create review');
});

exports.delete_Review = asyncWrapper(async (req, res) => {
  res.send('create review');
});
