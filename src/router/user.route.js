const { Router } = require('express');
const userController = require('../controllers/user.controller');
const validateNewUser = require('../utils/validadorUser');
const verifToken = require('../utils/autorizador');

const router = Router();

router.post('/', validateNewUser, userController.addUser);
router.get('', verifToken, userController.allUser);
router.get('/:id', verifToken, userController.idUser);
router.delete('/me', verifToken, userController.delUser);

module.exports = router;