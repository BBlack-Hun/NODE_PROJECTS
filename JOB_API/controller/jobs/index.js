const { Router } = require('express');
const router = Router();
const ctrl = require('./jobs.ctrl');

router.get('/', ctrl.get_all_jobs);
router.get('/:id', ctrl.get_job);
router.post('/', ctrl.post_create_job);
router.put('/:id', ctrl.update_job);
router.delete('/:id', ctrl.delete_job);

module.exports = router;
