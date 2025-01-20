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
  }
};

module.exports = DailyMarkModel;
