const { Router } = require('express');
const router = Router();
const ctrl = require('./dashboard.ctrl');

router.get('/', ctrl.get_dashboard);

module.exports = router;
