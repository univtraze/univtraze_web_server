const pool = require("../../config/database");

module.exports = {

    getAllCommunicableDisease: (data, callbBack) => {
        pool.query(
            `SELECT DISTINCT disease_name FROM communicable_disease_reporting`,
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
   
};