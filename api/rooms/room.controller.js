const { addRoom, getAllRooms, addVisitedRoom, checkIfRoomVisitedExists} = require("./room.service");

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
        body = req.body
            getAllRooms(body, (err, results) => {
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
    },

        

    addVisitedRoom: (req, res) => {
       
        body = req.body

        checkIfRoomVisitedExists(body, (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                success: 0,
                message: "Database connection Error"
            });
            }
            if(results.length === 0){
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
                    data: results
                });
            });
            }  

            const user_id = results[0].user_id
            const room_id = results[0].room_id
            const date = new Date(results[0].createdAt);
                

            return res.status(200).json({
                success: 1,
                data: date
            });
        });


    },


}