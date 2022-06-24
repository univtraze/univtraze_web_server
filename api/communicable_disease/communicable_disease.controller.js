const {getAllCommunicableDisease} = require('./communicable_disease.service')

module.exports = {
    getAllCommunicableDisease: (req, res) => {

        getAllCommunicableDisease((err, results) => {
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

        })

    },

    // addCommunicableDiseaseCase: (req, res) => {
        
    //     const body = req.body;

    //     addCommunicableDiseaseCase(body, (err, results) => {
    //         if(err){
    //             console.log(err)
    //             return res.json({
    //                 success: 0,
    //                 message: "Database connection Error"
    //             });
                
    //         }

    //         return res.json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // },
}