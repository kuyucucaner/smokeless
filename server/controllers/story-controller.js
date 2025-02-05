const StoryModel = require('../models/story-model');

const StoryController = {
    addStory : async function ( req,res)  {
        const userId = req.user.id;
        const { story_text } = req.body;
        if(!story_text || !userId) {
            return res.status(400).json({ message: 'Story text and user ID are required!' });
        }
        try{
            const storyId = await StoryModel.addStory({user_id : userId, story_text : story_text});
            console.log('Story Added!',storyId);
            return res.status(200).json({ storyId: storyId });
        }
        catch(err){
            console.log(err);
            return res.status(500).json({ message: 'Server Error' });
        }
    },
    getStories : async function (req,res) {
        try{
            const stories = await StoryModel.getAllStories();
            console.log('stories :' , stories);
            return res.status(200).json({ stories: stories });
        }
        catch(err){
            console.log(err);
            return res.status(500).json({ message: 'Server Error' });
        }
    },

};
module.exports = StoryController;