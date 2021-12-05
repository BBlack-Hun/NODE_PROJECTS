const asyncWrapper = require('../../middleware/async');
const Job = require('../../models/Job');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../../error/bad-request');

exports.get_all_jobs = asyncWrapper(async (req, res) => {
  const job = await Job.find({});
  res.status(StatusCodes.OK).json({ job });
});

exports.get_job = asyncWrapper(async (req, res) => {
  res.send('get job');
});

exports.post_create_job = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ job });
});

exports.update_job = asyncWrapper(async (req, res) => {
  res.send('update job');
});

exports.delete_job = asyncWrapper(async (req, res) => {
  res.send('delete job');
});
