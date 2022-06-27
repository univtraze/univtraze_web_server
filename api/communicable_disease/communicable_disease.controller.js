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

            const list = [] //...an array filled with values

            const functionThatReturnsAPromise = item => { //a function that returns a promise
                
                var allDisease = [];

                results.map((disease) => {   
                    getCommunicableDiseaseByName(disease, (err, results) => {
                                            
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
                                    
                        });  

                    allDisease.push(disease)

                })

                return Promise.resolve('ok')
            }

            const doSomethingAsync = async item => {
            return functionThatReturnsAPromise(item)
            }

            const getData = async () => {
            return Promise.all(results.map(item => doSomethingAsync(item)))
            }

            getData().then(data => {
            console.log(data)
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