const { User } = require('../models');

const existe = 'User already registered';
const inexiste = 'User does not exist';

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
      message: existe,
    };
  }
};
//
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
      message: inexiste,
    };
  }
  return { type: null, message: user };
};

const delUser = async (id) => {
  await User.destroy({
    where: { id },
  });
};

module.exports = {
  addUser,
  allUser,
  idUser,
  delUser,
};