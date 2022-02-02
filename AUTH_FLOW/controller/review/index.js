const { Router } = require('express');
const router = Router();
const ctrl = require('./review.ctrl');
const {
  authenticateUser,
  authorizePermissions,
} = require('../../middleware/authentication');

router.post('/', authenticateUser, ctrl.post_createReview);
router.get('/', authenticateUser, ctrl.get_AllReviews);
router.get('/:id', ctrl.get_SingleReview);
router.patch('/:id', authenticateUser, ctrl.update_Review);
router.delete('/:id', authenticateUser, ctrl.delete_Review);
router.get('/:id/reviews', authenticateUser, ctrl.getSingleProductReviews);

module.exports = router;
