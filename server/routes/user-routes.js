const express = require('express');
const UserController = require('../controllers/user-controller');
const ValidateMiddleware = require('../middlewares/validate-middleware');
const router = express.Router();

router.post('/register' ,ValidateMiddleware , UserController.registerUser);

router.post('/login' , UserController.loginUser);

module.exports = router;