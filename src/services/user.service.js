const { User } = require('../models');

const addUser = async (user) => {
  try {
    return {
      type: '',
      message: (await User.create(user)),
    };
  } catch (error) {
    return {
      type: 'USER_EXISTS',
      message: 'User already registered',
    };
  }
};

const allUser = async () => User.findAll({
  attributes: { exclude: ['password'] },
});

const idUser = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    return {
      type: 404,
      message: 'User does not exist',
    };
  }
  return { type: null, message: user };
};

module.exports = {
  addUser,
  allUser,
  idUser,
};