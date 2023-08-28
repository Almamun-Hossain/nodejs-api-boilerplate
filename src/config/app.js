const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const variables = require('./variables');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
const { errorConverter, errorHandler } = require('../middlewares/error');
const routes = require('../ routes/index')
const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// enable cors
app.use(cors());
app.options('*', cors());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// jwt authentication
app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/api/v1/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

//handle api error
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
