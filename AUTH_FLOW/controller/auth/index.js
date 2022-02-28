const { Router } = require('express');
const router = Router();
const ctrl = require('./auth.ctrl');
const { authenticateUser } = require('../../middleware/authentication');

router.post('/register', ctrl.post_register);
router.post('/login', ctrl.post_login);
router.delete('/logout', authenticateUser, ctrl.delete_logout);
router.post('/verify-email', ctrl.get_verifyEmail);
router.post('/reset-password', ctrl.reset_Password);
router.post('/forget-password', ctrl.forget_Password);

module.exports = router;
