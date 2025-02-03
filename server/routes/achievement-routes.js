const express = require("express");
const router = express.Router();
const AchievementController = require("../controllers/achievement-controller");
const AuthenticateToken = require("../middlewares/authenticate-token");
router.post(
  "/check",
  AuthenticateToken,
  AchievementController.checkAchievements
);

router.post(
  "/motivation-message",
  AuthenticateToken,
  AchievementController.getMotivationMessage
);
router.get("/suggestion", AchievementController.getSuggestion);

module.exports = router;
