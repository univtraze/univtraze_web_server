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

            var promises = results.map(function(disease){

                let allDisease = [];

                return  getCommunicableDiseaseByName(disease, (err, results) => {
                    
                    if(err){
                        console.log(err)
                        return res.json({
                            success: 0,
                            message: "Database connection Error while searching disease"
                        });             
                    }
                   
                   return allDisease.push({disease_name: disease.disease_name, total: results.length, results})
               
                })
                
            })

            Promise.all(promises).then(function(results) {
                return res.json({
                    success: 1,
                    data: results
                });
            })


           
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