const {getAllCommunicableDisease, getCommunicableDiseaseByName} = require('./communicable_disease.service')

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
                getCommunicableDiseaseByName(disease, (err, results) => {
                    if(err){
                        console.log(err)
                        return res.json({
                            success: 0,
                            message: "Database connection Error while searching disease"
                        });             
                    }
                   
                    allDisease.push({disease_name: disease.disease_name, total: results.length, results})
               
                })
            })

            return res.json({
                success: 1,
                data: allDisease + "Data"
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