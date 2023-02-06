require('dotenv').config();
const jwt = require('jsonwebtoken');

const token = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '1d', 
  algorithm: 'HS256',
  };

const geraToken = (payload) => jwt
.sign(payload, token, jwtConfig);

const verifToken = (vtoken) => {
  try {
    const user = jwt
    .verify(vtoken, token);
    const userOK = { 
      type: null, 
      message: user, 
    };
    return userOK;
  } catch (error) {
    return { 
      type: 'TOKEN_INVALID', 
      message: 'Expired or invalid token',
    };
  }
};

module.exports = {
  geraToken,
  verifToken,
};