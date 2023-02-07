const { Category } = require('../models');

const addCategory = async (category) => ({
    type: null,
    message: await Category
        .create(category),
});

const allCategories = async () => {
    const categories = await Category
        .findAll();

    console.log(categories);
    return categories;
};

module.exports = {
    addCategory,
    allCategories,
};