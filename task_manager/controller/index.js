const { Router } = require('express');
const router = Router();

router.use('/v1/tasks', require('./tasks'));

// router.use('/', require('./home'));

module.exports = router;
