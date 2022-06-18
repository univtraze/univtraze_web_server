
const { addCovidPositive, addEmergencyReport, addDailyAssessement, searchEmergencyReportsViaDate, addCommunicableDiseaseCase} = require("./covid_case.service");

module.exports = {
    addCommunicableDiseaseCase: (req, res) => {
        const body = req.body;

        return res.json({
            success: 1,
            data: body
        });
    },

    addCovidPositive: (req, res) => {
        const body = req.body;
        addCovidPositive(body, (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                
                    success: 0,
                    message: "Database connection Error"
                
                });
                
            }

            return res.json({
                success: 1,
                data: results
            });
        });
    },
    
    addDailyAssessment: (req, res) => {
        
        const body = req.body;

        addDailyAssessement(body, (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
                
            }

            return res.json({
                success: 1,
                data: body
            });
        });
    },

    addEmergencyReport: (req, res) => {
        const body = req.body;
        addEmergencyReport(body, (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
                
            }

            return res.json({
                success: 1,
                data: results
            });
        });
    },

    searchEmergencyReportsViaDate: (req, res) => {
        const body = req.body;

        searchEmergencyReportsViaDate(body, (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
                
            }

            return res.json({
                success: 1,
                data: results
            });
        });

    }
}