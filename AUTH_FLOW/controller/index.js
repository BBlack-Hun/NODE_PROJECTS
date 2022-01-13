const { Router } = require('express');
const router = Router();
// const authenticationMiddleWare = require('../middleware/auth');

router.get('/v1', (req, res) => {
  // console.log(req.cookies);
  console.log(req.signedCookies);
  res.send('auth-flow');
});

router.use('/v1/auth', require('./auth'));
router.use('/v1/users', require('./user'));
router.use('/v1/products', require('./product'));
// router.use('/v1/reviews', require('./reviews'));
// router.use('/v1/orders', require('./orders'));

module.exports = router;
