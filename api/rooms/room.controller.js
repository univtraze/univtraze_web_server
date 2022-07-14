const { addRoom, getAllRooms, addVisitedRoom,checkIfRoomExists, searchRoomNumber, userVisitedRooms, addUserNotification, userTodaysTemperature,  searchUsersByRoomId} = require("./room.service");

module.exports = {
    addRoom: (req, res) => {
        body = req.body
        
        checkIfRoomExists(body, (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
            }
            if(results.length > 0){

                return res.json({
                    success: 0,
                    message: "Room already Exist"
                });
            }
        
            addRoom(body, (err, results) => {
                if(err){
                    console.log(err)
                    return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
                }

                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });


        });
 
    },
    getAllRooms: (req, res) => {


            getAllRooms( async (err, results) => {
                if(err){
                    console.log(err)
                    return res.json({
                        success: 0,
                        message: "Database connection Error"
                    });
                }


                const queryResults = await Promise.all(
                
                    results.map(async (room) => {
                    
                    var start_date = new Date();
                    start_date.setDate(start_date.getDate() - 1);
                
                    room['start_date'] = start_date.toISOString().replace(/T/, ' ').replace(/\..+/, '')
                    room['end_date'] = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
                        
                     return new Promise((resolve, reject) => 
                      
                     searchUsersByRoomId(room, (err, results) => {
                         if (err) 
                           return reject(err)
                         else{
                            let returnIdArray = []
                            
                            results.map((user) => {
                                return returnIdArray.push(user.user_id)
                            })

                            let finalReturnedId = []
                            finalReturnedId.push(...new Set(returnIdArray))

                            return resolve({room_id: room.id, building_name: room.building_name, room_number: room.room_number, totalUserVisited: results.length, userVisited: results, userVisitedByIds: finalReturnedId})
                         }
                           
                       })
                     )
                   })
                 )


                return res.status(200).json({
                    success: 1,
                    data: queryResults
                });
            });
    },

        

    addVisitedRoom: (req, res) => {
       
        body = req.body

            addVisitedRoom(body, (err, results) => {
                if(err){
                    console.log(err)
                    return res.json({
                        success: 0,
                        message: "Database connection Error"
                    });
                }



                return res.status(200).json({
                    success: 1,
                    message: "Room visited Sucessfully",
                    data: results
                });
            });

    },

    searchRoomNumber: (req, res) => {
        const body = req.body;

        searchRoomNumber(body, (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        })
    },
    userVisitedRooms: (req, res) => {
        const body = req.body;

        userVisitedRooms(body, (err, results ) => {

            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
            

        })
    },

    userTodaysTemperature: (req, res) => {
        
        const body = req.body;

        userTodaysTemperature(body, (err, results ) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
            }

            if(results.length === 0){
                return res.status(200).json({
                    success: 0,
                    data: "Not set"
                }); 
            }

            return res.status(200).json({
                success: 1,
                data: results[0]
            });
            

        })

    },


}