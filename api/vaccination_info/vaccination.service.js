const pool = require("../../config/database");

module.exports = {
    updateVaccineInfo:(data, callBack ) => {
        pool.query(
            `UPDATE vaccination_record SET user_id=?,firstdose_vaxname=?,firstdose_date=?,seconddose_vaxname=?,seconddose_date=?,booster_vaxname=?,booster_date=? WHERE 1`,
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

    insertVaccineData:(data, callBack) => {
        
        pool.query(
            `INSERT INTO vaccination_record(user_id, firstdose_vaxname, firstdose_date, seconddose_vaxname, seconddose_date, booster_vaxname, booster_date) VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.user_id,
                data.firstdose_vaxname,
                data.firstdose_date,
                data.seconddose_vaxname,
                data.seconddose_date,
                data.booster_vaxname,
                data.booster_date
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results[0])
            }
        )
    },
   
};