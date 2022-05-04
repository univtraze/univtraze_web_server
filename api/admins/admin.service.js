const pool = require("../../config/database");

module.exports = {
    
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
    

    emailAdminCheck: (data, callBack ) => {
        pool.query(
            `SELECT * FROM admins WHERE email = ? || username = ?`,
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