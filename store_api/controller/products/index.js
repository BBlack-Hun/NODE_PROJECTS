const { Router } = require('express');
const router = Router();
const ctrl = require('./products.ctrl');

router.get('/static', ctrl.get_products_static);

router.get('/', ctrl.get_products);

router.post('/', ctrl.create_product);

router.get('/:id', ctrl.get_product);

router.put('/:id', ctrl.update_product);

router.delete('/:id', ctrl.delete_product);

module.exports = router;
