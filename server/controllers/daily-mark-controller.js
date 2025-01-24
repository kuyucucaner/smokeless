const DailyMarkModel = require("../models/daily-mark-model");
const UserModel = require("../models/user-model");

const DailyMarkController = {
  addOrUpdateMark: async function (req, res) {
    const userId = req.user.id;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }
    try {
     const newMark =  await DailyMarkModel.addOrUpdateMark({ user_id: userId, date: date });
     return res.status(200).json({
      success: true,
      message: 'Mark added or updated successfully',
      newMark, // Veritabanından gelen sonuç
    });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  getMarks: async function (req, res) {
    const userId = req.user.id;
    try {
      const marks = await DailyMarkModel.getMarks(userId);
      return res.status(200).json({ marks });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  calculateStats: async function (req, res) {
    const userId = req.user.id;
    const avarageCigarettePrice = 90;
    const cigarettesPerPack = 20; // Bir paketteki sigara sayısı
    const { cigarettesPerDay } = req.body.cigarettesPerDay;
    console.log("req body", cigarettesPerDay);
    if (!cigarettesPerDay) {
      return res
        .status(400)
        .json({ message: "Cigarettes per day are required" });
    }
    try {
      const marks = await DailyMarkModel.getMarks(userId);
      console.log("Marks:", marks); // Gelen veriyi kontrol edin

      const nonSmokingDays = marks.filter(
        (mark) => mark.is_marked === 1
      ).length;
      console.log("nonSmokingDays:", nonSmokingDays); // Gelen veriyi kontrol edin

      const updateUser = await UserModel.addCigarettesPerDay({
        cigarettes_per_day: cigarettesPerDay,
        user_id: userId,
      });
      console.log("updateUser:", updateUser); // Gelen veriyi kontrol edin

      const cigarettePricePerUnit = avarageCigarettePrice / cigarettesPerPack; // Sigara başına fiyat
      console.log("cigarettePricePerUnit:", cigarettePricePerUnit); // Gelen veriyi kontrol edin

      const savedMoney =
        nonSmokingDays * cigarettesPerDay * cigarettePricePerUnit;
      console.log("savedMoney:", savedMoney); // Gelen veriyi kontrol edin

      const healthBenefits = {
        improvedLungCapacity: `${nonSmokingDays * 2}%`,
        reducedHeartAttackRisk: `${nonSmokingDays * 1.5}%`,
        otherHealthRisks: "Reduced risk of cancer, improved overall health.",
      };
      console.log("healthBenefits:", healthBenefits); // Gelen veriyi kontrol edin

      return res.status(200).json({
        nonSmokingDays,
        savedMoney,
        healthBenefits,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  setGoal: async function (req, res) {
    const { targetDays } = req.body;
    const userId = req.user.id;
    console.log("targetDays:", targetDays); // Gelen veriyi kontrol edin
    console.log("userId:", userId); // Gelen veriyi kontrol edin

    if (!targetDays || targetDays <= 0) {
      return res
        .status(400)
        .json({ message: "Target days must be greater than 0" });
    }

    try {
      const goal = await DailyMarkModel.setGoal({
        user_id: userId,
        target_days: targetDays,
      });
      console.log("goal:", goal); // Gelen veriyi kontrol edin
      return res.status(200).json({ message: "Goal set successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error!" });
    }
  },
  checkProgress: async function (req, res) {
    const userId = req.user.id;
    console.log("userId: ", userId);

    try {
      // Veriyi doğru şekilde alıyoruz
      const { currentProgress, targetDays } =
        await DailyMarkModel.checkProgress(userId);
      console.log("currentProgress:", currentProgress); // Gelen veriyi kontrol edin
      console.log("targetDays:", targetDays); // Gelen veriyi kontrol edin

      if (targetDays === 0) {
        return res.status(404).json({ message: "No goal found for this user" });
      }

      if (currentProgress === 0) {
        return res
          .status(404)
          .json({ message: "No marks found for this user" });
      }

      // Hedefin ulaşılıp ulaşılmadığını kontrol ediyoruz
      const isGoalReached = currentProgress >= targetDays;
      console.log("isGoalReached:", isGoalReached); // Gelen veriyi kontrol edin
      return res.status(200).json({
        isGoalReached,
        currentProgress,
        targetDays
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
};

module.exports = DailyMarkController;
