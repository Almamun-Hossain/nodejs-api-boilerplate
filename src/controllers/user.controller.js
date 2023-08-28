const handleAsyncError = require('../utils/handleAsyncErrro');
const httpStatus = require('http-status');
const { userService } = require('../services');
const ApiError = require('../utils/ApiError');

const createUser = handleAsyncError(async (req, res, next) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(req.body);
});

const getSingleUser = handleAsyncError(async (req, res, next) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  res.status(httpStatus.OK).send(user);
});

const updateUser = handleAsyncError(async (req, res, next) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.status(httpStatus.OK).send(user);
});

const deleteUser = handleAsyncError(async (req, res, next) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
