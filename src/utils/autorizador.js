const { verifToken } = require('./token');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
 return res.status(401)
  .json({ message: 'Token not found' }); 
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
  .json({ message: 'User Not Found' }); 
}
  req.user = user;    
  next();
};