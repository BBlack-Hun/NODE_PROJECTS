const { Router } = require('express');
const router = Router();
const ctrl = require('./auth.ctrl');

router.post('/register', ctrl.post_register);
router.post('/verify-email', ctrl.get_verifyEmail);
router.post('/login', ctrl.post_login);
router.get('/logout', ctrl.get_logout);

module.exports = router;
