
// const { addCovidPositive, addEmergencyReport, addDailyAssessement, searchEmergencyReportsViaDate } = require("./covid_case.service");

module.exports = {
    uploadUserImageProfile: (req, res) => {
        
        const body = req.body;

        return res.json({
            success: 1,
            data: body
        });

        // addCovidPositive(body, (err, results) => {
        //     if(err){
        //         console.log(err)
        //         return res.json({
                
        //             success: 0,
        //             message: "Database connection Error"
                
        //         });
                
        //     }

            // return res.json({
            //     success: 1,
            //     data: body
            // });
        // });
    },
}