
const { addCovidPositive, addEmergencyReport } = require("./covid_case.service");

module.exports = {
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


}