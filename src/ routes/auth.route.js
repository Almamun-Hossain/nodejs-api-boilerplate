const express = require('express');
const { register, logout, login } = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const { authValidation } = require('../validation');

const router = express.Router();

router.post('/register', validate(authValidation.registerValidation), register);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
