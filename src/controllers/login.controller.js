const loginService = require('../services/login.service');
const { geraToken } = require('../utils/token');

const autLogin = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await loginService
  .autLogin(email, password);
  if (type) {
 return res.status(400)
  .json({ message }); 
}
  const token = geraToken({ email }); 
  res.status(200).json({ token });
};

module.exports = {
  autLogin,
};