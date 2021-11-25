const { Router } = require('express');
const router = Router();
const ctrl = require('./dashboard.ctrl');

const authMiddleware = require('../../middleWare/auth');

router.get('/', authMiddleware, ctrl.get_dashboard);

module.exports = router;
