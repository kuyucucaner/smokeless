const db = require('../config/db');

const UserModel = {
    findByEmail: async (email) => {
        try {
            console.log("Email being searched:", email); // Debugging
            const [rows] = await db.query("SELECT * FROM users WHERE email = ?", {
                replacements: [email], // Pass the email as an array in replacements
                type: db.QueryTypes.SELECT, // Ensures the result is properly handled as a SELECT query
            });
            return rows;
        } catch (err) {
            console.error("Error in findByEmail:", err);
            throw err; // Rethrow the error for higher-level handling
        }
    },
    createUser: async (user) => {
        try {
            const [result] = await db.query(
                "INSERT INTO users (firstName, email, password) VALUES (?, ?, ?)",
                {
                    replacements: [user.firstName, user.email, user.password], // Safe way to insert variables
                    type: db.QueryTypes.INSERT, // Ensures the query type is INSERT
                }
            );
            return result;
        } catch (err) {
            console.error("Error in createUser:", err);
            throw err;
        }
    },
};

module.exports = UserModel;
