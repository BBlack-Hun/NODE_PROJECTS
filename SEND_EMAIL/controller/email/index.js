const { Router } = require('express');
const router = Router();
const ctrl = require('./eamil.ctrl');

router.get('/send', ctrl.get_send_email);
router.get('/send2', ctrl.get_send_email2);

module.exports = router;
