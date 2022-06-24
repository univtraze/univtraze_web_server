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

            Promise.all(
                results.map(async (disease) => {
                    
                  const allDiseaseData = await getCommunicableDiseaseByName(disease, (err, results) => {
                        if(err){
                                console.log(err)
                                return res.json({
                                    success: 0,
                                    message: "Database connection Error"
                                });
                                
                            }
                
                            return console.log(results.data)
                        });

                  console.log(allDiseaseData);

                })
              )
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