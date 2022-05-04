const pool = require("../../config/database");

module.exports = {
    emailAdminCheck: (data, callBack ) => {
        pool.query(
            `SELECT * FROM admins WHERE email = ? || username = ?`,
            [
                data.email,
                data.username
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    createAdmin: (data, callBack) => {
        pool.query(
            `INSERT INTO admins(username, email, password) 
                         VALUES (?,?,?)`,
            [
                data.username,
                data.email,
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

    getAdminByEmail: (data, callBack) => {
        pool.query(
            `SELECT * FROM admins WHERE email = ? || username = ?`,
            [
                data.email,
                data.username
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results[0])
            }
        )
    },

   
};