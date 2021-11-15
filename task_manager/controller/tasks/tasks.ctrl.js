const Task = require('../../models/Task');
const asyncWrapper = require('../../middleware/async');

exports.get_tasks = asyncWrapper(async (req, res) => {
  // try {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  //   // res
  //   //   .status(200)
  //   //   .json({ ststus: 'success', data: { tasks, nbHits: tasks.length } });
  // } catch (error) {
  //   res.status(500).json({ msg: error });
  // }
});

exports.post_task = asyncWrapper(async (req, res) => {
  // try {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
  // } catch (error) {
  //   res.status(500).json({ msg: error });
  // }
});

exports.get_task = asyncWrapper(async (req, res) => {
  // try {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `no task with id : ${taskID}` });
  }

  res.status(200).json({ task });
  // } catch (error) {
  //   res.status(500).json({ msg: error });
  // }
});

exports.patch_task = asyncWrapper(async (req, res) => {
  // try {
  const { id: taskID } = req.params;
  console.log(req.body);
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res.status(404).json({ msg: `no task with id : ${taskID}` });
  }

  res.status(200).json({ task });
  // } catch (e) {
  //   res.status(500).json({ msg: e });
  // }
  // res.send('update task');
});

exports.delete_task = asyncWrapper(async (req, res) => {
  // try {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }
  res.status(200).json({ task });
  // res.status(200).json({ task: null, status: 'success' });
  // } catch (e) {
  //   res.status(500).json({ msg: error });
  // }
  // // res.send('delete task');
});

// exports.put_task = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     console.log(req.body);
//     const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//       overwrite: true,
//     });

//     if (!task) {
//       return res.status(404).json({ msg: `no task with id : ${taskID}` });
//     }

//     res.status(200).json({ task });
//   } catch (e) {
//     res.status(500).json({ msg: e });
//   }
// };
