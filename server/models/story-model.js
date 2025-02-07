const db = require("../config/db");

const StoryModel = {
  addStory: async ({user_id, story_text}) => {
    try {
      const result = await db.query(
        `INSERT INTO stories (user_id , story_text) VALUES ( ? , ?)`,
        {
          replacements: [user_id, story_text],
          type: db.QueryTypes.INSERT, // Ensures the query type is INSERT
        }
      );
      return result;
    } catch (err) {
      console.error("Error in adding story:", err);
      throw err;
    }
  },
  getAllStories: async () => {
    try {
      const result = await db.query(
        ` SELECT stories.* , users.email FROM stories JOIN users ON stories.user_id = users.user_id ORDER BY stories.created_at  DESC`,
        {
            type: db.QueryTypes.SELECT, // Ensures the result is properly handled as a SELECT query
        }
      );
      return result;
    } catch (err) {
      console.error("Error in getting all stories:", err);
      throw err;
    }
  },
};

module.exports = StoryModel;
