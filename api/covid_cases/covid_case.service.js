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
                JSON.stringify(data.medical_condition), 
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
    },

    addDailyAssessement: (data, callBack) => {
        pool.query(
            `INSERT INTO daily_assessment(user_id, symptoms,pending_covid_test,pending_test_date) VALUES (?,?,?,?)`,
            [
                data.id,
                JSON.stringify(data.symptoms),
                data.description,
                data.pending_test_date, 
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