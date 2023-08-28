const httpStatus = require('http-status');
const { createUser } = require('../services/user.service');
const handleAsyncError = require('../utils/handleAsyncErrro');
const loginUserByEmailandPassword = require('../services/auth.service');
const { generateToken } = require('../services/token.service');
const variables = require('../config/variables');


const register = handleAsyncError(async (req, res, next) => {
  const user = await createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const login = handleAsyncError(async (req, res, next) => {
  let { email, password } = req.body;

  
  let user = await loginUserByEmailandPassword(email, password);
  res.send(req.body);

  // let token = generateToken(user._id);
  // const options = {
  //   expires: new Date(Date.now() + variables.jwt.cookiesExpire * 24 * 60 * 60 * 1000),
  //   httpOnly: true,
  // };
  // res.status(httpStatus.OK).cookie('token', token, options).send({ user, token });
});

const logout = handleAsyncError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(httpStatus.OK).json({ success: true, message: 'Logged out successfully!' });
});

module.exports = {
  register,
  login,
  logout,
};
