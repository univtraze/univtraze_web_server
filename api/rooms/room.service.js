const pool = require("../../config/database");

module.exports = {
   
    addRoom: (data, callBack) => {
        pool.query(
            `INSERT INTO room_details(room_number, building_name, room_name) VALUES (?,?,?)`,
            [
                data.room_number,
                data.building_name, 
                data.room_name
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    }
};