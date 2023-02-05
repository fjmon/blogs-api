const { User } = require('../models');

const autLogin = async (email, password) => {
  const aut = await User.findOne({ where: { email, password } });

  if (!aut) {
    return { type: 'INVALID_USER', message: 'Invalid fields' };
  }

  return { type: '', message: aut };
};

module.exports = {
  autLogin,
};