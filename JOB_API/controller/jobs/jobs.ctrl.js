const asyncWrapper = require('../../middleware/async');

exports.get_all_jobs = asyncWrapper(async (req, res) => {
  res.send('get all jobs');
});

exports.get_job = asyncWrapper(async (req, res) => {
  res.send('get job');
});

exports.post_create_job = asyncWrapper(async (req, res) => {
  res.send('create job');
});

exports.update_job = asyncWrapper(async (req, res) => {
  res.send('update job');
});

exports.delete_job = asyncWrapper(async (req, res) => {
  res.send('delete job');
});
