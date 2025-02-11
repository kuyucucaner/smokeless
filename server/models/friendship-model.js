const db = require('../config/db');

const FriendshipModel = {
    addFriendship : async ({user_id , friend_id}) => {
        try {
            const response = await db.query("INSERT INTO friendships (user_id, friend_id) VALUES (? , ? )" , {
                replacements : [ user_id, friend_id],
                type: db.QueryTypes.INSERT, // Ensures the query type is INSERT
            });
            return response;
        }
        catch (err){
            console.error("Error in adding friendship:", err);
            throw err;
        }
    },
    getUserFriendships : async({user_id}) => {
        try {
            const response = await db.query("SELECT * FROM friendships WHERE user_id = ?" , {
                replacements : [ user_id],
                type: db.QueryTypes.SELECT, // Ensures the query type is SELECT
            })

            return response;
        }
        catch (err){
            console.error("Error in getting user friendships:", err);
            throw err;
        }
    }
};

module.exports = FriendshipModel;