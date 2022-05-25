const pool = require("../../config/database");

module.exports = {
    emailClinicAdminCheck: (data, callBack ) => {
        pool.query(
            `SELECT * FROM clinic_credentials WHERE email = ? || username = ?`,
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

    createClinicAdmin: (data, callBack) => {
        pool.query(
            `INSERT INTO clinic_credentials(username, email, password) 
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

   
};