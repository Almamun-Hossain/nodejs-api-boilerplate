const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { getUserByEmail } = require('./user.service');

const loginUserByEmailandPassword = async (email, password) => {

  let user = await getUserByEmail(email);
    if (!user || !(await user.isPasswordMatched(password, user.password)))
      throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect user email or password');
    return user;
  
};

module.exports = loginUserByEmailandPassword;
