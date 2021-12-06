const asyncWrapper = require('../../middleware/async');
const Job = require('../../models/Job');
const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../../error/bad-request');
const NotFoundError = require('../../error/notfounderror');

exports.get_all_jobs = asyncWrapper(async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
});

exports.get_job = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
    params: { id: jobID },
  } = req;

  const job = await Job.findOne({ _id: jobID, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No Job with id: ${jobID}`);
  }
  res.status(StatusCodes.OK).json({ job });
});

exports.post_create_job = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ job });
});

exports.update_job = asyncWrapper(async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobID },
  } = req;

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Postion fields cannot bd empty');
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobID, createdBy: userId },
    req.body,
    { new: true, runValidators: true },
  );

  if (!job) {
    throw new NotFoundError(`No job with id ${jobID}`);
  }

  res.status(StatusCodes.CREATED).json({ job });
});

exports.delete_job = asyncWrapper(async (req, res) => {
  res.send('delete job');
});
