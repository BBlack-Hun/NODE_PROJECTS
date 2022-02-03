const { Router } = require('express');
const router = Router();
const ctrl = require('./product.ctrl');
const upload = require('../../middleware/multer');
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

router.post(
  '/uploadImage',
  authenticateUser,
  authorizePermissions('admin'),
  upload.single('image'),
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

router.get('/:id/reviews', ctrl.getSingleProductReviews);

module.exports = router;
