const db = require("../config/db");

const GroupModel = {
  createGroup: async (user_id , group_name) => {
    try {
      const response = await db.query(
        "INSERT INTO user_groups ( user_id ,group_name) VALUES (? , ?) ",
        {
          replacements: [user_id,group_name],
          type: db.QueryTypes.INSERT, // Ensures the query type is INSERT
        }
      );
      return response;
    } catch (err) {
      console.error("Error creating group:", err);
      return null;
    }
  },
  joinGroup: async (user_id, group_id) => {
    try {
      const response = await db.query(
        "INSERT INTO group_membership ( user_id , group_id ) VALUES ( ?, ?) ",
        {
          replacements: [user_id, group_id],
          type: db.QueryTypes.INSERT, // Ensures the query type is INSERT
        }
      );
      return response;
    } catch (err) {
      console.error("Error joining group:", err);
      return null;
    }
  },
};

module.exports = GroupModel;
