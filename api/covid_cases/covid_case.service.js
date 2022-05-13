const pool = require("../../config/database");

module.exports = {

    addCovidPositive: (data, callBack) => {
        pool.query(
            `INSERT INTO covid_reporting(user_id, case_number, proof_docs) VALUES (?,?,?)`,
            [
                data.user_id, 
                data.case_number, 
                data.proof_docs
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    
    addEmergencyReport: (data, callBack) => {
        pool.query(
            `INSERT INTO emergency_reporting(reported_by, patient_name, medical_condition, description, room_number) VALUES (?,?,?,?,?)`,
            [
                data.reported_by,
                data.patient_name,
                data.JSON.stringify(medical_condition), 
                data.description,
                data.room_number
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    }
   
};