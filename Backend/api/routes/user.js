const {Router} = require('express');
const controller = require('../controllers/auth');

const router = Router();

router.post('/login',controller.login);

router.post('/sendFeedback',controller.sendFeedback);
router.post('/updatePassword',controller.updatePassword);


module.exports = router;