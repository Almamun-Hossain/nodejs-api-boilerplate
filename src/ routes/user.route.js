const express = require('express');
const { testController, createUser, getSingleUser, updateUser, deleteUser } = require('../controllers/user.controller');
const validate = require('../middlewares/validate');
const { authValidation } = require('../validation');
const router = express.Router();

router.route('/').get().post(validate(authValidation.login), createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
