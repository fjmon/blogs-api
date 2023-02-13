const userService = require('../services/user.service');
const { geraToken, verifToken } = require('../utils/token');

const addUser = async (req, res) => {
  const { displayName, email } = req.body;
  const { type, message } = await userService
    .addUser(req.body);
  if (type) return res.status(409).json({ message }); 

  const token = geraToken({ displayName, email });
  res.status(201).json({ token });
};

const allUser = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401)
      .json({ message: 'Token not found' });
  }
  const { type, message } = verifToken(authorization);
  if (type) {
    return res.status(401)
      .json({ message });
  }
  return res.status(200)
    .json(await userService.allUser());
};

const idUser = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.idUser(id);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const delUser = async (req, res) => {
  const { user: { id: userId },
  } = req;
  await userService.delUser(userId);
  res.status(204).end();
};

module.exports = {
  addUser,
  allUser,
  idUser,
  delUser,
};