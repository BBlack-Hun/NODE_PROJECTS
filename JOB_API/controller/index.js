const { Router } = require('express');
const router = Router();

router.use('/v1/auth', require('./auth'));
router.use('/v1/jobs', require('./jobs'));

module.exports = router;
