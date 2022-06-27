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

            var allDisease = [];

            const gitAllDiseaseData = new Promise((resolve, reject) => {

                var returnData = [];

                results.map(async (disease) => {

                    await getCommunicableDiseaseByName(disease, (err, results) => {
                                
                            if(err){
                                console.log(err)
                                return res.json({
                                success: 0,
                                message: "Database connection Error"
                                });                                
                            }
    
                            // disease['total'] = results.data
                            disease['cases'] = results
                            disease['totalCases'] = results.length
    
                            return returnData.push(disease)
                            
                        });
                });

                resolve(returnData);
              });
              
              gitAllDiseaseData.then((value) => {
                console.log(value);
              });
              


        //    results.forEach(async (disease) => {
                        
        //         await getCommunicableDiseaseByName(disease, (err, results) => {
                            
        //                 if(err){
        //                     console.log(err)
        //                     return res.json({
        //                     success: 0,
        //                     message: "Database connection Error"
        //                     });                                
        //                 }

        //                 // disease['total'] = results.data
        //                 disease['cases'] = results
        //                 disease['totalCases'] = results.length

        //                 allDisease.push(disease)
        //                 return console.log(disease)
        //             });

        //     });
            

            
            // return res.json({
            //     success: 1,
            //     data: allDisease
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