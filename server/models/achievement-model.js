const db = require("../config/db");

const AchievementModel = {
  getConsecutiveDays: async (user_id) => {
    try {
      const result = await db.query(
        "SELECT COUNT(*) AS consecutiveDays FROM daily_marks WHERE user_id = ? ",
        {
          replacements: [user_id],
          type: db.QueryTypes.SELECT, // Ensures the query type is SELECT
        }
      );
      return result[0].consecutiveDays;
    } catch (error) {
      console.error("Error in getConsecutiveDays:", error);
      throw error;
    }
  },

  checkAchievement: async (user_id) => {
    try {
      const consecutiveDays = await AchievementModel.getConsecutiveDays(
        user_id
      );

      const achievements = await db.query(
        "SELECT * FROM achievements WHERE required_days <= ?",
        {
          replacements: [consecutiveDays],
          type: db.QueryTypes.SELECT,
        }
      );
      console.log("achievements ", achievements);

      const userAchievements = await db.query(
        "SELECT achievement_id FROM user_achievements WHERE user_id = ?",
        {
          replacements: [user_id],
          type: db.QueryTypes.SELECT,
        }
      );

      return { consecutiveDays, userAchievements, achievements };
    } catch (error) {
      console.error("Error in checkAchievement:", error);
      throw error;
    }
  },
  getDailyMessage: async (user_id) => {
    try {
      const consecutiveDays = await AchievementModel.getConsecutiveDays(user_id);

      const message = await db.query(
        "SELECT message FROM daily_messages WHERE day = ? ",
        {
          replacements: [consecutiveDays],
          type: db.QueryTypes.SELECT, // Ensures the query type is SELECT
        }
      );
      return message.length ? message[0].message : null;
    } catch (error) {
      console.error("Error in getDailyMessage:", error);
      throw error;
    }
  },
  getSuggestion : async() => {
    try {
      const [suggestion] = await db.query("SELECT * FROM suggestions ORDER BY RAND() LIMIT 1" , 
        { type: db.QueryTypes.SELECT }
      );
      return suggestion;
    }
    catch (error) {
      console.error("Error in getSuggestion:", error);
      throw error;
    }
  }
};

module.exports = AchievementModel;
