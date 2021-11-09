const Task = require('../../models/Task');

exports.get_tasks = async (req, res) => {
  res.send('get all tasks');
};

exports.post_task = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

exports.get_task = async (req, res) => {
  res.send('get task');
};

exports.patch_task = async (req, res) => {
  res.send('update task');
};

exports.delete_task = async (req, res) => {
  res.send('delete task');
};
