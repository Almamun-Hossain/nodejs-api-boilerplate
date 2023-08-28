const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const router = express.Router();

const defaultRoutePath = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
];

defaultRoutePath.forEach(({path, route}) => {
    console.log(path);
  router.use(path, route);
});

module.exports = router;
