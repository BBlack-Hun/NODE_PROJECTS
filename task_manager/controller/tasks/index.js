const { Router } = require('express');
const router = Router();
const ctrl = require('./tasks.ctrl');

// get all the tasks
router.get('/', ctrl.get_tasks);

// create a new task
router.post('/', ctrl.post_task);

// get single task
router.get('/:id', ctrl.get_task);

// update task
router.patch('/:id', ctrl.patch_task);

// delete task
router.delete('/:id', ctrl.delete_task);

module.exports = router;
