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

            var diseaseData = [];

            results.map(async (disease) => {
            
                    await getCommunicableDiseaseByName(disease, (err, results) => {
                            
                    if(err){
                        console.log(err)
                        return res.json({
                         success: 0,
                         message: "Database connection Error"
                        });                                
                        }

                        var returnArray = []
                        returnArray.push(results.data)
                            
                        diseaseData.push({disease_name: disease.disease_name,total: returnArray.length, data: results.data})
                        return 
                            
                    });
                

                })

                return res.json({
                 success: 1,
                 data: diseaseData
                });                                
            
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