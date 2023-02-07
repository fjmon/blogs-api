const categoryService = require(
    '../services/category.service',
);

const addCategory = async (req, res) => {
    const { body } = req;
    const {
        type, message,
    } = await categoryService
        .addCategory(body);

    if (type !== 400) {
        return res.status(201)
            .json(message);
    }
    res.status(400)
        .json({ message });
};

const allCategories = async (_req, res) => {
    const users = await categoryService
        .allCategories();

    res.status(200).json(users);
};

module.exports = {
    addCategory,
    allCategories,
};