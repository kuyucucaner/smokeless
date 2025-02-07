const express = require('express');
const router = express.Router();
const StoryController = require('../controllers/story-controller');
const AuthenticateToken = require('../middlewares/authenticate-token');

router.post('/add-story', AuthenticateToken  ,StoryController.addStory);

router.get('/get-stories', StoryController.getStories);
module.exports = router;