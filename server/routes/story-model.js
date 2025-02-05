const express = require('express');
const router = express.Router();
const StoryController = require('../controllers/story-controller');


router.post('/add-story', StoryController.addStory);

router.get('/get-stories', StoryController.getStories);
module.exports = router;