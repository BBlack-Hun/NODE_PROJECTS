const { Router } = require('express');
const router = Router();
const ctrl = require('./user.ctrl');

router.get('/', ctrl.get_AllUsers);
router.get('/showMe', ctrl.get_ShowCurrentUser);
router.post('/updateUser', ctrl.patch_updateUser);
router.post('/updateUserPassword', ctrl.patch_updateUserPassword);
router.get('/:id', ctrl.get_SingleUser);

module.exports = router;
