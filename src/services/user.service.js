const { User } = require('../models');
// teste
const addUser = async (body) => {
  try {
    const result = await User.findOne({
      where: { email: body.email },
    });
    if (result) throw new Error();
    return {
      type: '',
      message: (await User.create(body)),
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