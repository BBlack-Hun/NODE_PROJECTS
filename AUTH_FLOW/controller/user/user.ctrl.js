exports.get_AllUsers = asyncWrapper(async (req, res) => {
  res.send('get all users route');
});

exports.get_SingleUser = asyncWrapper(async (req, res) => {
  res.send('get single user ');
});

exports.get_ShowCurrentUser = asyncWrapper(async (req, res) => {
  res.send('show current user');
});

exports.patch_updateUser = asyncWrapper(async (req, res) => {
  res.send('update user');
});

exports.patch_updateUserPassword = asyncWrapper(async (req, res) => {
  res.send('update user password');
});
