const db = require('../config/db');

const UserModel = {
    findByEmail : async (email) => {
        try{
            const sql = await db.query("SELECT * FROM users WHERE email = ?", [email]);
            return sql ; 
        }
        catch(err){
            throw err; // Hata meydana gelirse fırlat
        }
    },
    createUser : async (user) => {
        try {

            const sql = await db.query(
                "INSERT INTO users (firstName, email, password) VALUES (?, ?, ?)",
                [user.firstName, user.email, user.password]
              );
              return sql;
        }
        catch(err){
            throw err; // Hata meydana gelirse fırlat
        }
    },
};

module.exports = UserModel;