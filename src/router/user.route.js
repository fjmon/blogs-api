const { Router } = require('express');
const userController = require('../controllers/user.controller');
const validateNewUser = require('../utils/validadorUser');

const router = Router();

router.post('/', validateNewUser, userController.addUser);
router.get('', userController.allUser);

module.exports = router;