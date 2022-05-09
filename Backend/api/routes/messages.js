const {Router} = require('express');
const controller = require('../controllers/chats');


const router = Router();


router.post('/message/sendMessage',controller.newMessage);
router.get('/message/getMessages',controller.getMessages);

module.exports = router;