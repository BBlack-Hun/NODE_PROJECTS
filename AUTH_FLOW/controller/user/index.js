const { Router } = require('express');
const router = Router();
const ctrl = require('./user.ctrl');
const { authenticateUser } = require('../../middleware/authentication');
/**
 * 라우터 배치에 따라 param으로 받아오는 값이 달라진다...
 * /showMe를 /:id 밑에 배치할 경우, postman으로 호출을 할 경우,
 * response로 id : showMe라는 값을 반환하게 된다.
 */
router.get('/', authenticateUser, ctrl.get_AllUsers);
router.get('/showMe', authenticateUser, ctrl.get_ShowCurrentUser);
router.patch('/updateUser', ctrl.patch_updateUser);
router.patch('/updateUserPassword', ctrl.patch_updateUserPassword);
router.get('/:id', authenticateUser, ctrl.get_SingleUser);

module.exports = router;
