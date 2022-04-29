const pool = require("../../config/database");

module.exports = {
    emailCheck: (data, callBack ) => {
        pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [
                data.email
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO users(email, provider, password, type, secret) 
                         VALUES (?,?,?, NULL)`,
            [
                data.email,
                data.provider,
                data.password,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    getUsers: callBack => {
        pool.query(
            `SELECT id, type, email, provider, password, createdAt, updatedAt FROM users WHERE 1`,
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error)
                }
                return callBack(null, results);
            }
        )
    },
    getUserById: (id, callBack) => {
        pool.query(
            `SELECT id, type, email, provider, password, createdAt, updatedAt FROM users WHERE id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    return callBack(error)
                }
                return callBack(null, results[0]);
            }
        )
    },
    getUserByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results[0])
            }
        )
    }
};