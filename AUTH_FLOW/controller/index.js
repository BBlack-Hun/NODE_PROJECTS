const { Router } = require('express');
const router = Router();
// const authenticationMiddleWare = require('../middleware/auth');

router.use('/v1/auth', require('./auth'));
// router.use('/v1/users', require('./users'));
// router.use('/v1/products', require('./products'));
// router.use('/v1/reviews', require('./reviews'));
// router.use('/v1/orders', require('./orders'));

module.exports = router;
