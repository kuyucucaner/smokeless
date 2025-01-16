const express = require('express');
const UserController = require('../controllers/user-controller');
const ValidateMiddleware = require('../middlewares/validate-middleware');
const AuthenticateToken = require('../middlewares/authenticate-token');
const router = express.Router();

router.post('/register' ,ValidateMiddleware , UserController.registerUser);

router.post('/login' , UserController.loginUser);

router.put('/set-quit-date' ,  AuthenticateToken ,UserController.setQuitDate);


module.exports = router;