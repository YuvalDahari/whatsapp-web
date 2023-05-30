const express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

router.route('/').post(userController.createUser);

router.route('/:username').get(userController.isLoggedIn ,userController.getUserByUsername);

module.exports = router;