const express = require('express');
const router = express.Router();
const DailyMarkController = require('../controllers/daily-mark-controller');
const AuthenticateToken = require('../middlewares/authenticate-token');

router.post('/add-or-update-mark' , AuthenticateToken , DailyMarkController.addOrUpdateMark);

router.get('/get-marks' , AuthenticateToken , DailyMarkController.getMarks);

router.put('/calculate-stats', AuthenticateToken , DailyMarkController.calculateStats);

router.post('/set-goal', AuthenticateToken , DailyMarkController.setGoal);

module.exports = router;