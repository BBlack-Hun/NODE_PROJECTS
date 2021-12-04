const { Router } = require('express');
const router = Router();
const authenticationMiddleWare = require('../middleware/auth');

router.use('/v1/auth', require('./auth'));
router.use('/v1/jobs', authenticationMiddleWare, require('./jobs'));

module.exports = router;
