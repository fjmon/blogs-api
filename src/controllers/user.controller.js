const userService = require(
  '../services/user.service',
);
const {
  geraToken,
} = require(
  '../utils/token',
);

const addUser = async (req, res) => {
  const { body } = req;
  const {
    type, message,
  } = await userService
    .addUser(body);
  if (type) {
    return res.status(409)
      .json({ message });
  }

  const {
    displayName, email,
  } = req.body;
  const token = geraToken({
    displayName, email,
  });
  res.status(201).json({ token });
};
// teste
const allUser = async (_req, res) => {
  res.status(200)
    .json(await userService.allUser());
};

const idUser = async (req, res) => {
  const {
    type, message,
  } = await userService
    .idUser(req.params.id);
  if (type) {
    return res.status(type)
      .json({ message });
  }
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