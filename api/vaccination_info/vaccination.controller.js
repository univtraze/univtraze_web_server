const { insertVaccineData } = require("./vaccination.service");

module.exports = {
    updateVaccineData: (req, res) => {
        const body = req.body;
            updateVaccineData(body, (err, results) => {
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

    },

    insertVaccineData: (req, res) => {
        const body = req.body;
        
        insertVaccineData(body, (err, results) => {
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
        
    }
}