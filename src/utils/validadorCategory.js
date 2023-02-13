const Joi = require('joi');

const nameVal = Joi
    .string()
    .required()
    .messages({
        'any.required': '"name" is required',
    });

const validaCategory = (body) => Joi
    .object({
        name: nameVal,
    }).validate(body);

module.exports = (req, res, next) => {
    const { body } = req;
    const { error } = validaCategory(body);
    if (error) {
        return res.status(400)
            .json({ message: error.message });
    }
    next();
};