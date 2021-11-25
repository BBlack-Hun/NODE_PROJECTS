const { Router } = require('express');
const router = Router();
const ctrl = require('./dashboard.ctrl');

const authMiddleware = require('../../middleWare/auth');

// middle ware인 authMiddleware에서 검증이 끝난 후 넘어간다.
router.get('/', authMiddleware, ctrl.get_dashboard);

module.exports = router;
