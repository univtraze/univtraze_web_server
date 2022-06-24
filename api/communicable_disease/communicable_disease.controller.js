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

            results.map((disease) => {
                return console.log(disease.disease_name)
            })
            // let allDisease = [];

            // var promises = results.map(function(disease){

            //     getCommunicableDiseaseByName(disease, (err, results) => {
            //         if(err){
            //             console.log(err)
            //             return res.json({
            //                 success: 0,
            //                 message: "Database connection Error while searching disease"
            //             });             
            //         }

            //      return allDisease.push(results)
               
            //     })
                
            // })

            // Promise.all(promises).then(function(results) {
            //     return res.json({
            //         success: 1,
            //         data: results,
            //         allDisease: allDisease
            //     });
            // })
           
        })

    },

    getCommunicableDiseaseByName: (req, res) => {
        
        const body = req.body;

        getCommunicableDiseaseByName(body, (err, results) => {
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