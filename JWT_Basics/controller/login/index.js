const { Router } = require('express');
const router = Router();
const ctrl = require('./login.ctrl');

router.post('/', ctrl.post_login);

module.exports = router;
