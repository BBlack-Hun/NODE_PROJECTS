exports.get_tasks = async (req, res) => {
  res.send('get all tasks');
};

exports.post_task = async (req, res) => {
  res.send('create task');
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
