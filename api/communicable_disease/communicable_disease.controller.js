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

            results.map(async (disease) => {

                    // return allDisease.push(disease)

                    await getCommunicableDiseaseByName(disease, (err, results) => {
                            
                        if(err){
                            console.log(err)
                            return res.json({
                            success: 0,
                            message: "Database connection Error"
                            });                                
                        }

                        disease['total'] = results.data.data.length
                        disease['cases'] = results.data.data

                        return allDisease.push(disease)
                    
                    });

            })

            return res.json({
                success: 1,
                data: allDisease
            })

                                          
            
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