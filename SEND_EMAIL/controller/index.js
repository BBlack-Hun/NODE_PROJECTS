const { Router } = require('express');
const router = Router();

router.use('/v1/', require('./email'));

module.exports = router;
