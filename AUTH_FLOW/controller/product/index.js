const { Router } = require('express');
const router = Router();
const ctrl = require('./product.ctrl');
const {
  authenticateUser,
  authorizePermissions,
} = require('../../middleware/authentication');

router.post(
  '/',
  authenticateUser,
  authorizePermissions('admin'),
  ctrl.createProduct,
);
router.get('/', ctrl.getAllProducts);

router.patch(
  '/uploadImage',
  authenticateUser,
  authorizePermissions('admin'),
  ctrl.updateImage,
);

router.get('/:id', ctrl.getSingleProduct);
router.patch(
  '/:id',
  authenticateUser,
  authorizePermissions('admin'),
  ctrl.updateProduct,
);
router.delete(
  '/:id',
  authenticateUser,
  authorizePermissions('admin'),
  ctrl.deleteProduct,
);

module.exports = router;
