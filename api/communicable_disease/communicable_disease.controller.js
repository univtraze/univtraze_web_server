const {getAllCommunicableDisease, getCommunicableDiseaseByName, updateCommunicableDiseaseCaseStatus} = require('./communicable_disease.service')

module.exports = {
    getAllCommunicableDisease: (req, res) => {

        getAllCommunicableDisease( async (err, results) => {
            
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

            const queryResults = await Promise.all(
                
                results.map(async (disease) => {
                 
                 return new Promise((resolve, reject) => 
                  
                 getCommunicableDiseaseByName(disease, (err, results) => {
                     if (err) 
                       return reject(err)
                     else
                       return resolve({disease_name: disease.disease_name,totalCases: results.length, cases: results})
                   })
                 )
               })
             )

            //  console.log('queryResults', queryResults)

             return res.json({
                success: 1,
                data: queryResults
             })
             // now you give this queryResults back to your FE             
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

    updateCommunicableDiseaseCaseStatus: (req, res) => {

        const body = req.body

        updateCommunicableDiseaseCaseStatus(body, (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
                
            }

            // if(results.data.affectedRows === 0){
            //     return res.json({
            //         success: 0,
            //         data: "No data found for this case"
            //     });
            // }

            return res.json({
                success: 1,
                data: results
            });
        })
    }

}