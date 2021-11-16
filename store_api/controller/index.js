const { Router } = require('express');
const router = Router();

router.use('/v1/products', require('./products'));

module.exports = router;
