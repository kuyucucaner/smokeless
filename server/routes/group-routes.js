const express = require('express');
const router = express.Router();

const AuthenticateToken = require('../middlewares/authenticate-token');
const GroupController = require('../controllers/group-controller');

router.post('/create-group' , AuthenticateToken, GroupController.addGroup);

router.post('/join-group' , AuthenticateToken, GroupController.joinGroup);

module.exports = router;

