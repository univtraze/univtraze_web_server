const { addRoom, getAllRooms, addVisitedRoom, checkIfRoomVisitedExists, checkIfRoomExists, searchRoomNumber, userVisitedRooms} = require("./room.service");

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
                    message: "Room visited",
                    data: results
                });
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

        return res.status(200).json({
            success: 1,
            data: body
        });

        // userVisitedRooms(body, (err, results ) => {

        //     if(err){
        //         console.log(err)
        //         return res.json({
        //             success: 0,
        //             message: "Database connection Error"
        //         });
        //     }
        //     return res.status(200).json({
        //         success: 1,
        //         data: results
        //     });


        // })
    }


}