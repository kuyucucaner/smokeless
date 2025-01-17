const DailyMarkModel = require('../models/daily-mark-model');

const DailyMarkController = {
        addOrUpdateMark : async function ( req, res) {
            const userId = req.user.id;
            const { date } = req.body;

            if(!date) {
                return res.status(400).json({ message : 'Date is required' });
            }
            try {
                await DailyMarkModel.addOrUpdateMark({ user_id : userId , date : date});
                return res.status(200).json({ message : 'Mark added or updated successfully' });
            }
            catch (err){
                console.log(err);
                return res.status(500).json({ message : 'Server Error' });
            }
        },
        getMarks : async function (req, res) {
            const userId = req.user.id;
            try {
                const marks = await DailyMarkModel.getMarks(userId);
                return res.status(200).json({ marks });
            }
            catch (err){
                console.log(err);
                return res.status(500).json({ message : 'Server Error' });
            }
        }
};

module.exports = DailyMarkController;