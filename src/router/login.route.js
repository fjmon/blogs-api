const { Router } = require('express');
const loginController = require('../controllers/login.controller');
const { validaLogin } = require('../utils/validador');

const router = Router();

router.post('/', validaLogin, loginController.autLogin);

module.exports = router;