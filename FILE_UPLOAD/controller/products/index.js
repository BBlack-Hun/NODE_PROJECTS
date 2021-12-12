const { Router } = require('express');
const router = Router();
const ctrl = require('./product.ctrl');

router.post('/', ctrl.post_create_product);
router.get('/', ctrl.get_all_products);
router.post('/upload', ctrl.post_upload_image);

module.exports = router;
