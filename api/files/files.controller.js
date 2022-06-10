
// const { addCovidPositive, addEmergencyReport, addDailyAssessement, searchEmergencyReportsViaDate } = require("./covid_case.service");

module.exports = {
    
    uploadUserImageProfile: (req, res) => {
        const body = req.files;

        return res.json({
            success: 1,
            data: JSON.stringify(body)
        });

    },
}