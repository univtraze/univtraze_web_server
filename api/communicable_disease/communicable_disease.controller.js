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

            const diseaseData = [] //...an array filled with values

            const getDiseaseData = async (disease) => {
                
                console.log('Dapat matapos to bago ang lahat')

                return await getCommunicableDiseaseByName(disease, (err, results) => {                                        
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
                                                
                        return diseaseData.push(disease)
                   });  
            }

            const getAllDiseaseData = async (results) => {
                console.log(results)
                console.log('Dat sa taas nito mga array ng disease')
                console.log("Pangalawang Function dito")
                return Promise.all(results.map((disease) => getDiseaseData(disease)))
            }

            getAllDiseaseData(results).then(() => {
                console.log("Final Function dito pagkatapos ng promise")
                return res.json({
                    success: 1,
                    message: diseaseData
                });
            })


        //    results.map(async (disease) => {   
        //         await getCommunicableDiseaseByName(disease, (err, results) => {
                                        
        //            if(err){
        //               console.log(err)
        //               return res.json({
        //                   success: 0,
        //                   message: "Database connection Error"
        //                   });                                
        //              }
            
        //               // disease['total'] = results.data
        //              disease['cases'] = results
        //              disease['totalCases'] = results.length
                                    
        //              return disease
        //             });  

        //     })
            
                              
            
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