const pool = require("../../config/database");

module.exports = {

    addCommunicableDiseaseCase: (data, callBack) => {
        pool.query(
            `INSERT INTO communicable_disease_reporting(user_id, type, disease_name, document_proof_image) VALUES (?, ?, ?, ?)`,
            [
                data.user_id,
                data.type,
                data.disease_name, 
                data.document_proof_image
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

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

    addDailyAssessement: (data, callBack) => {
        pool.query(
            `INSERT INTO daily_assessment(user_id, symptoms,pending_covid_test,pending_test_date) VALUES (?,?,?,?)`,
            [
                data.id,
                JSON.stringify(data.symptoms),
                data.pending_covid_test,
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

    searchEmergencyReportsViaDate: (data, callBack) => {
        pool.query(
            `select * from emergency_reporting where createdAt between ? and CONCAT(?, ' 23:59:59')`,
            [
                data.date,
                data.date
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    getAllEmergencyReports: callBack => {
        pool.query(
            `SELECT * FROM emergency_reporting WHERE case_status = 'On-going' ORDER BY updatedAt DESC`,
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    getAllEmergencyReportsResolved: callBack => {
        pool.query(
            `SELECT * FROM emergency_reporting WHERE case_status = 'Resolved' ORDER BY updatedAt DESC`,
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },


    getAllEmergencyReportsByStatus: (data, callBack) => {
        pool.query(
            `SELECT * FROM emergency_reporting WHERE case_status = ? ORDER BY updatedAt DESC`,
            [
                data.case_status
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