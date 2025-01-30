const express = require("express");
const router = express.Router();
const AchievementController = require("../controllers/achievement-controller");
const AuthenticateToken = require("../middlewares/authenticate-token");
router.post(
  "/check",
  AuthenticateToken,
  AchievementController.checkAchievements
);

// router.get(
//   "/motivation/:day",
//   AuthenticateToken,
//   AchievementController.getMotivationMessage
// );

module.exports = router;
