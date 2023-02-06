const Joi = require('joi');

const validateNewUser = (body) => Joi.object({
  email: Joi.string().email().required(),
  displayName: Joi.string().min(8).required().messages({
      'string.min': '"displayName" length must be at least 8 characters long',
    }),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
}).validate(body);

module.exports = (req, res, next) => {
  const { error } = validateNewUser(req.body);

  if (error) return res.status(400).json({ message: error.message });

  next();
};