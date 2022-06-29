const {getAllCommunicableDisease, getCommunicableDiseaseByName, updateCommunicableDiseaseCaseStatus, deleteCommunicableDisease, getUserVisitedRooms} = require('./communicable_disease.service')

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

            if(results.affectedRows === 0){
                return res.json({
                    success: 0,
                    data: "No data found for this case"
                });
            }

            return res.json({
                success: 1,
                data: results
            });
        })
    },
    deleteCommunicableDisease: (req, res) => {

        const body = req.body

        deleteCommunicableDisease(body, (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
            }

            if(results.affectedRows === 0){
                return res.json({
                    success: 0,
                    data: "No data found for this case"
                });
            }

            return res.json({
                success: 1,
                data: results
            });
        })
    },

    getFirstDegreeCommunicableDisease: (req, res) => {
        const body = req.body

        var start_date = new Date(body.date_reported).format("YYYY-MM-DD");
        start_date.setDate(start_date.getDate() - body.date_range);

        body['start_date'] = start_date
        body['end_date'] = new Date(body.date_reported).toISOString().replace(/T/, ' ').replace(/\..+/, '')


        getUserVisitedRooms(body, (err, results) => {
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
                    data: "No rooms visited found",
                    data_used: body
                });
            }


            return res.json({
                success: 1,
                data: results
            });



        })
        
        //Get rooms that this user visited for the past *n days
    },

}