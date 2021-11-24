const { Router } = require('express');
const router = Router();

router.use('/v1/login', require('./login'));
router.use('/v1/dashboard', require('./dashboard'));

module.exports = router;
