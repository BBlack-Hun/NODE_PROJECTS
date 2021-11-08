const { Router } = require('express');
const router = Router();

router.use('/api/v1/tasks', require('./tasks'));

router.use('/', require('./home'));

module.exports = router;
