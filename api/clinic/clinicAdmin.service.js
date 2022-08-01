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

    getClinicAdminByEmail: (data, callBack) => {
        pool.query(
            `SELECT * FROM clinic_credentials WHERE email = ? || username = ?`,
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

    getTotalActiveEmergencyReports: callBack =>{
        pool.query(
            `SELECT DISTINCT COUNT(id) as totalEmergencyReport FROM emergency_reporting`,
            [],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    getTotalResolvedEmergencyReports: callBack =>{
        pool.query(
            `SELECT DISTINCT COUNT(id) as totalResolvedEmergencyReport FROM emergency_reporting where case_status = "resolved"`,
            [],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    getTotalCommunicableDiseaseReports: callBack =>{
        pool.query(
            `SELECT DISTINCT COUNT(id) as totalCommunicableDiseaseReport FROM communicable_disease_reporting`,
            [],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    getTotalCommunicableDiseaseReportedOngoing: callBack =>{
        pool.query(
            `SELECT DISTINCT COUNT(id) as totalCommunicableDiseaseReportedOngoing FROM communicable_disease_reporting where case_status = "On-going"`,
            [],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    getTotalCommunicableDiseaseReportedResolved: callBack =>{
        pool.query(
            `SELECT DISTINCT COUNT(id) as totalCommunicableDiseaseReportedResolved FROM communicable_disease_reporting where case_status = "Resolved"`,
            [],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    getTotalCommunicableDiseaseReportedTodayOngoing: (data, callBack) =>{
        pool.query(
            `SELECT DISTINCT COUNT(id) as totalCommunicableDiseaseReportedOngoingToday FROM communicable_disease_reporting where case_status = "On-going" AND createdAt Between ? AND ?`,
            [
                data.start_date, 
                data.end_date
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    getTotalCommunicableDiseaseReportedTodayResolved: (data, callBack) =>{
        pool.query(
            `SELECT DISTINCT COUNT(id) as totalCommunicableDiseaseReportedResolvedToday FROM communicable_disease_reporting where case_status = "Resolved" AND createdAt Between ? AND ?`,
            [
                data.start_date, 
                data.end_date
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    checkIfIdAndPasswordMatched: (data, callBack) => {
        pool.query(
            `SELECT * FROM clinic_credentials WHERE id = ?`,
            [
                data.user_id
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results[0])
            }
        )
    },
   updateNewPassword: (data, callBack) => {
        pool.query(
            `UPDATE clinic_credentials SET password=? WHERE id = ?`,
            [
                data.new_password, 
                data.user_id
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    }
};