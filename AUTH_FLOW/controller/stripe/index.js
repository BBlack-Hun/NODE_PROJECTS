const { Router } = require('express');
const router = Router();
const ctrl = require('./stripe.ctrl');

router.post('/', ctrl.post_stripe);

module.exports = router;
