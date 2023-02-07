const { Router } = require('express');
const categoryController = require(
    '../controllers/category.controller',
);
const validateNewCategory = require(
    '../utils/validadorCategory',
);
const verifToken = require(
    '../utils/autorizador',
);

const router = Router();

router.post('/', verifToken,
    validateNewCategory,
    categoryController.addCategory);
router.get('', verifToken,
    categoryController.allCategories);

module.exports = router;