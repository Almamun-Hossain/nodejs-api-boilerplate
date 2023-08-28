const moment = require('moment');

const jwt = require('jsonwebtoken');
const variable = require('../config/variables');

const generateToken =  (userId, expires, type, secret = variable.jwt.secret) => {
  let payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };

  return jwt.sign(payload, secret);
};

module.exports = generateToken;