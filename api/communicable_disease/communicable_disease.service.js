const pool = require("../../config/database");

module.exports = {

    getAllCommunicableDisease: callBack => {
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

    getCommunicableDiseaseByName: (data, callBack) => {
        pool.query(
            `SELECT id, user_id, type, disease_name, document_proof_image, createAt, updatedAt FROM communicable_disease_reporting WHERE disease_name = ?`,
            [
                data.disease_name,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    updateCommunicableDiseaseCaseStatus: (data, callBack) => {
        pool.query(
            `UPDATE communicable_disease_reporting SET case_status = ? WHERE id = ?`,
            [
                data.case_status,
                data.id
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