const {Router} = require('express');
const controller = require('../controllers/admin');

const router = Router();

router.delete('/removeUserById/:id', controller.removeUserById);
router.delete('/activeUserById/:id', controller.activeUserById);
// router.post('/adminLogin/',controller.adminLogin);
router.post('/admin',controller.addAdmin);
router.get('/admin',controller.getActAdmins);
router.get('/users',controller.getUsers);
router.get('/users/activeUsers',controller.getActiveUsers);
router.get('/users/nonActiveUsers', controller.getNonActiveUsers);
router.get('/userById/:id',controller.getUserById)



module.exports = router;