const { Router } = require('express');
const router = Router();
const ctrl = require('./order.ctrl');
const {
  authenticateUser,
  authorizePermissions,
} = require('../../middleware/authentication');

router.post('/', authenticateUser, ctrl.post_createOrder);
router.get(
  '/',
  authenticateUser,
  authorizePermissions('admin', 'user'),
  ctrl.get_allOrders,
);
router.get('/showAllMyOrders', authenticateUser, ctrl.get_currentUserOrders);
router.get('/:id', authenticateUser, ctrl.get_singleOrder);
router.patch('/:id', authenticateUser, ctrl.patch_updateOrder);

module.exports = router;
