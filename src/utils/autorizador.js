const { verifToken } = require('./token');
const { User } = require('../models');
// teste
const unToken = 'Token not found';
const unUser = 'User Not Found';

const autoriza = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
 return res.status(401)
  .json({ message: unToken }); 
}  
  const { type, message } = verifToken(authorization);
  if (type) return res.status(401).json({ message });
  
  const user = await User
  .findOne({ where: { 
    email: verifToken(authorization).message.email, 
  },
    attributes: { exclude: ['password'] } });
  if (!user) {
 return res.status(400)
  .json({ message: unUser }); 
}
  req.user = user;    
  next();
};

module.exports = autoriza;