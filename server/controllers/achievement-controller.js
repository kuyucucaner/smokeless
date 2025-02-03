const AchievementModel = require("../models/achievement-model");

const AchievementController = {
  checkAchievements: async function (req, res) {
    const user_id = req.user.id; // Token'dan user_id al
    console.log('user ID ACHİEVEMENT : ' , user_id);
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    try {
      const { consecutiveDays, userAchievements ,achievements } = await AchievementModel.checkAchievement(user_id);

      console.log("user ACHIEVEMENT : " , userAchievements);
      console.log("consecutiveDays ACHİEVEMENT : " , consecutiveDays);
          // Kullanıcının kazandığı başarımların achievement_id'lerini bir diziye al
      const userAchievementIds = userAchievements.map((ua) => ua.achievement_id);
      const matchAchievements = achievements.filter((achievement) => 
        userAchievementIds.includes(achievement.achievement_id)
      );
      if (matchAchievements.length > 0) {
        return res.status(200).json({matchAchievements});
      } else {
        return res.status(200).json({ message: "Başarım kazanılmadı!" });
      } 
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  getMotivationMessage: async function (req, res) {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ message: "UserID parameter is required" });
    }
    try {
      const message = await AchievementModel.getDailyMessage(userId);
      if (!message) {
        return res.status(404).json({ message: "No motivation message found" });
      }
      return res.status(200).json({ message });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  getSuggestion : async function ( req, res) {
    try {
      const suggestion = await AchievementModel.getSuggestion();
      if (!suggestion) {
        return res.status(404).json({ message: "No suggestion found" });
      }
      return res.status(200).json({ suggestion });
    }
    catch(err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error!" });
    }

  },
};

module.exports = AchievementController;
