const Joi = require('joi');

const emailVal = Joi
  .string()
  .email()
  .required();
const dNameVal = Joi
  .string()
  .min(8)
  .required()
  .messages({
    'string.min': '"displayName" length must be at least 8 characters long',
  });
const passwordVal = Joi
  .string()
  .min(6)
  .required();
const imageVal = Joi
  .string();

const validateNewUser = (body) => Joi
  .object({
    email: emailVal,
    displayName: dNameVal,
    password: passwordVal,
    image: imageVal,
  }).validate(body);

module.exports = (req, res, next) => {
  const { body } = req;
  const { error } = validateNewUser(body);
  if (error) {
    return res.status(400)
      .json({ message: error.message });
  }
  next();
};