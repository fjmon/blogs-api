const { User } = require('../models');

const addUser = async (user) => ({
  type: '',
  message: (await User.create(user)),
});

const allUser = async () => User.findAll({
  attributes: { exclude: ['password'] },
});

module.exports = {
  addUser,
  allUser,
};