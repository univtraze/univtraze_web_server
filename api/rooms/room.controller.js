const { addRoom, getAllRooms, addVisitedRoom, checkIfRoomVisitedExists, updateVisitedRoom} = require("./room.service");

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


            return res.status(200).json({
                success: 1,
                data: "Room Already Visited",
                lastVisitedDate: results[0].updatedAt
            });

            // const date = new Date(results[0].updatedAt);
            // const dateToday = new Date();
            
            // const year1 = date.getFullYear()
            // const month1 =date.getMonth() + 1
            // const day1 = date.getDay()

            // const yearNow1 = dateToday.getFullYear()
            // const monthNow1 = dateToday.getMonth() + 1
            // const dayNow1 = dateToday.getDay()

            // const updatedAt = year1+'-'+month1+'-'+day1
            // const currentDate = yearNow1+'-'+monthNow1+'-'+dayNow1

            // if(updatedAt === currentDate){
            //     updateVisitedRoom(body, (err, results) => {
            //         if(err){
            //             console.log(err)
            //             return res.json({
            //                 success: 0,
            //                 message: "Database connection Error"
            //             });
            //         }
            //         return res.status(200).json({
            //             success: 1,
            //             message: "Visited room date updated successfully",
            //             data: results
            //         });
               
            //  });
            // }
            
            // addVisitedRoom(body, (err, results) => {
            //     if(err){
            //         console.log(err)
            //      return res.json({
            //         success: 0,
            //         message: "Database connection Error"
            //      });
            //     }

            //     return res.status(200).json({
            //         success: 1,
            //         data: results
            //     });
            // });

            
        });


    },


}