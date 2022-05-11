const pool = require("../../config/database");

module.exports = {

    checkIfRoomExists: (data, callBack) => {
        pool.query(
            `SELECT id, room_number, building_name, room_name, createdAt, updatedAt FROM room_details WHERE room_number = ? AND building_name = ? AND room_name = ?`,
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
    },
   
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