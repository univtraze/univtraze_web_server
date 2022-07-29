const {emailClinicAdminCheck, createClinicAdmin, getClinicAdminByEmail, 
    getTotalActiveEmergencyReports, getTotalCommunicableDiseaseReports,
    getTotalCommunicableDiseaseReportedOngoing, getTotalCommunicableDiseaseReportedResolved, getTotalCommunicableDiseaseReportedTodayOngoing, getTotalCommunicableDiseaseReportedTodayResolved} = require("./clinicAdmin.service");
const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const { sign } = require("jsonwebtoken")
const moment = require('moment')

module.exports = {
    createClinicAdmin: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)

        emailClinicAdminCheck(body, (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
            }

            if(results.length !== 0){
                return res.json({
                    success: 0,
                    message: "Email/Username already have an account"
                });
            }

            createClinicAdmin(body, (err, results) => {
                if(err){
                    console.log(err)
                    return res.json({
                        success: 0,
                        message: "Database connection Error"
                    });
                }
    
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });

        });
    },

    
    loginClinicAdmin: (req, res) => {
        const body = req.body;

        getClinicAdminByEmail(body, (err, results) => {
            if(err) {
                console.log(err );
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "Incorrect Email or Password"
                })
            }

            const result = compareSync(body.password, results.password);

            if(result) {
                result.password = undefined;
                const jsonToken = sign({result: results}, process.env.JSON_KEY, {
                    expiresIn: "7d"
                })

                return res.json({
                    success: 1,
                    message: "Login successfully",
                    token: jsonToken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Incorrect Email or Password"
                })
            }
        });

    },

    getAllTotalCases: async (req, res) => {

        var start_date = moment();
        start_date = start_date.subtract(1, "days");
        start_date = start_date.format("YYYY-MM-DD HH:mm:ss");
        var end_date = moment().format("YYYY-MM-DD HH:mm:ss")
        
        let totalEmergencyReports = await new Promise((resolve, reject) => {
            getTotalActiveEmergencyReports((err, results) => {
                if(err){
                    return reject(err.message)
                }
                    return resolve(results[0].totalEmergencyReport)
            })
        })

        let totalCommunicableDiseaseReports = await new Promise((resolve, reject) => {
            getTotalCommunicableDiseaseReports((err, results) => {
                if(err){
                    return reject(err.message)
                }
                    return resolve(results[0].totalCommunicableDiseaseReport)
            })
        })

        let totalCommunicableDiseaseReportedOngoing = await new Promise((resolve, reject) => {
            getTotalCommunicableDiseaseReportedOngoing((err, results) => {
                if(err){
                    return reject(err.message)
                }
                    return resolve(results[0].totalCommunicableDiseaseReportedOngoing)
            })
        })

        let totalCommunicableDiseaseReportedResolved = await new Promise((resolve, reject) => {
            getTotalCommunicableDiseaseReportedResolved((err, results) => {
                if(err){
                    return reject(err.message)
                }   
                    
                    return resolve(results[0].totalCommunicableDiseaseReportedResolved)
            })
        })

        let totalCommunicableDiseaseReportedTodayOngoing = await new Promise((resolve, reject) => {
            getTotalCommunicableDiseaseReportedTodayOngoing({start_date, end_date}, (err, results) => {
                if(err){
                    return reject(err.message)
                }   
                    
                    return resolve(results[0].totalCommunicableDiseaseReportedOngoingToday)
            })
        })

        let totalCommunicableDiseaseReportedTodayResolved = await new Promise((resolve, reject) => {
            getTotalCommunicableDiseaseReportedTodayResolved({start_date, end_date}, (err, results) => {
                if(err){
                    return reject(err.message)
                }   
                    
                    return resolve(results[0].totalCommunicableDiseaseReportedResolvedToday)
            })
        })

    

        return res.json({
            success: 1,
            results: {
                totalEmergencyReports,
                totalCommunicableDiseaseReports,
                totalCommunicableDiseaseReportedOngoing,
                totalCommunicableDiseaseReportedResolved,
                totalCommunicableDiseaseReportedTodayOngoing,
                totalCommunicableDiseaseReportedTodayResolved
            }
        })

    }
}