const { Category } = require('../models');

const addCategory = async (category) => ({
    type: null,
    message: await Category
        .create(category),
});

const allCategories = async () => Category
    .findAll();

module.exports = {
    addCategory,
    allCategories,
};