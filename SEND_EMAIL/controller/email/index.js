const { Router } = require('express');
const router = Router();
const ctrl = require('./eamil.ctrl');

router.get('/send', ctrl.get_send_email);

module.exports = router;
