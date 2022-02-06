const { Router } = require('express');
const router = Router();
// const authenticationMiddleWare = require('../middleware/auth');

router.get('/v1', (req, res) => {
  // console.log(req);
  console.log(req.signedCookies);
  res.send('auth-flow');
});

router.use('/v1/stripe', require('./stripe'));
router.use('/v1/auth', require('./auth'));
router.use('/v1/users', require('./user'));
router.use('/v1/products', require('./product'));
router.use('/v1/reviews', require('./review'));
router.use('/v1/orders', require('./order'));

module.exports = router;
