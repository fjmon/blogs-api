require('dotenv').config();
const jwt = require('jsonwebtoken');

const token = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '1d', 
  algorithm: 'HS256',
  };

const geraToken = (payload) => jwt.sign(payload, token, jwtConfig);

const verifToken = (vtoken) => {
  try {
    const user = jwt.verify(vtoken, token);
    return { type: null, message: user };
  } catch (error) {
    return { type: 400, message: 'invalid token' };
  }
};

module.exports = {
  geraToken,
  verifToken,
};