const { Router } = require('express');
const router = Router();
const ctrl = require('./user.ctrl');
const {
  authenticateUser,
  authorizePermissions,
} = require('../../middleware/authentication');
/**
 * 라우터 배치에 따라 param으로 받아오는 값이 달라진다...
 * /showMe를 /:id 밑에 배치할 경우, postman으로 호출을 할 경우,
 * response로 id : showMe라는 값을 반환하게 된다.
 *
 * authorizedPermissions() <- 파라미터로 주어지는 것에 대해서, 해당 로직을
 * 통과할 수 있다. 'admin', 'user' 시 두 role에 대해서, permission true로 통과...
 */
router.get(
  '/',
  authenticateUser,
  authorizePermissions('admin', 'owner'),
  ctrl.get_AllUsers,
);
router.get('/showMe', authenticateUser, ctrl.get_ShowCurrentUser);
router.patch('/updateUser', ctrl.patch_updateUser);
router.patch(
  '/updateUserPassword',
  authenticateUser,
  ctrl.patch_updateUserPassword,
);
router.get('/:id', authenticateUser, ctrl.get_SingleUser);

module.exports = router;
