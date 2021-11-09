const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: String,
  Completed: Boolean,
});

module.exports = mongoose.model('Task', TaskSchema);
