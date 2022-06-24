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

            if(results.length === 0){
                return res.json({
                    success: 0,
                    message: "No disease found"
                });
                            
            }

            let allDisease = []

            results.map((disease) => {   
                return allDisease.push(disease.disease_name)
            })

            return res.json({
                success: 1,
                data: allDisease,
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