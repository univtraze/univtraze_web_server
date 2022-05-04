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
            `INSERT INTO admin(username, email, password) 
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

    getAdminByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM admins WHERE email = ? || username = ?`,
            [email],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results[0])
            }
        )
    },

   
};