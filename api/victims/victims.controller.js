const { getUserVisitedRooms, getUsersViaRoomIdAndDate } = require("./victims.service");

module.exports = {
    getFirstDegreeVictims: (req, res) => {
        
        const body = req.body

        var start_date = new Date(body.date_reported);
        start_date.setDate(start_date.getDate() - body.date_range);

        body['start_date'] = start_date.toISOString().replace(/T/, ' ').replace(/\..+/, '')
        body['end_date'] = body.date_reported

        getUserVisitedRooms(body, async (err, results) => {
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
                    config: body
                });
            }

            //COnstructing of return array to a single array of rooms
            let newRoomArray = [];
            results.map((room_id) => {
                return newRoomArray.push(room_id.room_id)
            })

            let firstDegreeVictimsId = [];

            await Promise.all(
                
                newRoomArray.map(async (room_id) => {
                
                 let newBody = body
                 newBody['room_id'] = room_id
                 

                 return new Promise((resolve, reject) => 
                   getUsersViaRoomIdAndDate(newBody, (err, results) => {
                      if (err) 
                        return reject(err)
                      else{
                        let returnArray = [];

                        results.map((victim) => {
                            return returnArray.push(victim.user_id) 
                        })
                        
                        return resolve({room_id: room_id, userVisitedById: returnArray, userVisitedByData: results})
                      } 
                   })
                 )
               })
             ).then((results) => {

                let returnArray = [];

                results.map((result) => {
                    return returnArray.push(...result.userVisitedById)
                })

                let initialReturnArray = []
                initialReturnArray.push(...returnArray)
                
                firstDegreeVictimsId.push(...new Set(initialReturnArray))

                const valueToRemove = body.user_id
                const filteredItems = firstDegreeVictimsId.filter(function(item) {
                return item !== valueToRemove
                })

                firstDegreeVictimsId = filteredItems
                
             })


             return res.json({
                success: 1,
                data: {
                    initialVictim: body.user_id,
                    type: body.type,
                    case_id: body.case_id,
                    start_date: body.start_date,
                    end_date: body.end_date,
                    date_range: body.date_range,
                    date_reported: body.date_reported, 
                    firstDegreeVictimsId: firstDegreeVictimsId
                }
                
             })

        })
        

    }

}