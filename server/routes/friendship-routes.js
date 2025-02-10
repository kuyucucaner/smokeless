const express = require('express'); 
const router = express.Router();

const FriendshipController = require('../controllers/friendship-controller');
const AuthenticateToken = require('../middlewares/authenticate-token');

router.post('/add-friendship' , AuthenticateToken , FriendshipController.addFriendship);

router.get('/get-friendship' , AuthenticateToken , FriendshipController.getUserFriendships);

module.exports = router;