const { Router } = require('express');
const router = Router();
const ctrl = require('./auth.ctrl');

router.post('/register', ctrl.post_register);

router.post('/login', ctrl.post_login);

module.exports = router;
