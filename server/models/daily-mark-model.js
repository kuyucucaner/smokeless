const db = require("../config/db");

const DailyMarkModel = {
  addOrUpdateMark: async ({ user_id, date }) => {
    try {
      const [result] = await db.query(
        "INSERT INTO daily_marks (user_id , date , is_marked) VALUES (  ? , ? , true ) ON DUPLICATE KEY UPDATE is_marked = true", {
            replacements : [user_id , date],
            type: db.QueryTypes.INSERT, // Ensures the query type is INSERT
        }
    );
    return result;
    } catch (error) {
      console.error("Error in addOrUpdateMark:", error);
      throw error;
    }
  },
  getMarks : async (user_id) => {
    try{
        const rows = await db.query('SELECT * FROM daily_marks WHERE user_id = ? ORDER BY date ASC', {
            replacements : [user_id],
            type: db.QueryTypes.SELECT, // Ensures the query type is SELECT
        })
        return rows;
    }
    catch (error) {
        console.error("Error in getMarks:", error);
        throw error;
    }
  },
  setGoal: async ({user_id , target_days}) => {
    try {
        const [results] = await db.query(
            'INSERT INTO goals (user_id , target_days) VALUES (?, ?) ON DUPLICATE KEY UPDATE target_days = ?', 
            {
                replacements : [user_id, target_days, target_days],
                type: db.QueryTypes.INSERT, // Ensures the query type is INSERT
            }
        );
        return results;
    } catch (error) {
        console.error("Error in setGoal:", error);
        throw error;
    }
},
  checkProgress: async (user_id) => {
    try {
        const markedDaysResult = await db.query("SELECT COUNT(*) AS markedDays FROM daily_marks WHERE user_id = ?", {
          replacements : [user_id],
          type: db.QueryTypes.SELECT, // Ensures the query type is SELECT
        });
        const goalResult = await db.query("SELECT target_days FROM goals WHERE user_id = ?", {
          replacements: [user_id],
          type: db.QueryTypes.SELECT, // Ensures the query type is SELECT
        });

        const currentProgress = markedDaysResult[0]?.markedDays || 0;
        const targetDays = goalResult[0]?.target_days || 0;

        return { currentProgress , targetDays };
    }
    catch(error){
      console.error("error in checkprogress :" , error);
      throw error;
    }
  },

};

module.exports = DailyMarkModel;
