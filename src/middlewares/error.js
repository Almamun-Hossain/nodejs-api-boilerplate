const { config } = require('dotenv');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const variables = require('../config/variables');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    4;
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next();
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (variables.env === 'live' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;
  const response = {
    code: statusCode,
    message,
    ...(variables.env === 'dev' && { stack: err.stack }),
  };
  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
