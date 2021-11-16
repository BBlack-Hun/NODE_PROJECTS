const { Router } = require('express');
const router = Router();
const ctrl = require('./products.ctrl');

router.get('/', ctrl.get_products);

module.exports = router;
