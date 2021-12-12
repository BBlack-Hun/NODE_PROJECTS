const { Router } = require('express');
const router = Router();
// const authenticationMiddleWare = require('../middleware/auth');

router.use('/v1/products', require('./products'));

module.exports = router;
