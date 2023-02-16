const { User } = require('../models');

const invalido = 'Invalid fields';
const logado = 'Logged in successfully';
const autLogin = async (email, password) => {
  const aut = await User
    .findOne({ where: { email, password } });

  if (!aut) {
    return {
      type: 'INVALID_USER',
      message: invalido,
    };
  }

  return {
    type: '',
    message: logado,
    aut,
  };
};

module.exports = {
  autLogin,
};