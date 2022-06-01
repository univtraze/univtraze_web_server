const pool = require("../../config/database");

module.exports = {

    checkIfRoomExists: (data, callBack) => {
        pool.query(
            `SELECT id, room_number, building_name, room_name, createdAt, updatedAt FROM rooms WHERE room_number = ? AND building_name = ? AND room_name = ?`,
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
            `INSERT INTO rooms(room_number, building_name, room_name) VALUES (?,?,?)`,
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

    getAllRooms: (data, callBack) => {
        pool.query(
            `SELECT id, room_number, building_name, room_name, createdAt, updatedAt FROM rooms WHERE 1`,
            [
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },


    addVisitedRoom: (data, callBack) => {
        pool.query(
            `INSERT INTO room_visited(user_id, room_id) VALUES (?,?)`,
            [
                data.user_id,
                data.room_id
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    updateVisitedRoom: (data, callBack) => {
        pool.query(
            `UPDATE room_visited SET updatedAt = CURRENT_TIMESTAMP`,
            [
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    searchRoomNumber: (data, callBack) => {
        pool.query(
            `SELECT id, room_number, building_name, room_name, createdAt, updatedAt FROM rooms WHERE room_number = ?`,
            [
                data.room_number,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    userVisitedRooms: (data, callBack) => {
        pool.query(
            `SELECT room_visited.id,room_visited.user_id,room_visited.room_id,rooms.room_number, rooms.building_name, rooms.room_name, room_visited.temperature,room_visited.createdAt,room_visited.updatedAt FROM room_visited, rooms WHERE room_visited.user_id = ? AND rooms.id = room_visited.room_id`,
            [
                data.user_id,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

};