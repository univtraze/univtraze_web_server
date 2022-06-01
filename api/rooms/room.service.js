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

    checkIfRoomVisitedExists: (data, callBack) => {
        pool.query(
            `SELECT id, user_id, room_id, createdAt, updatedAt FROM room_visited WHERE user_id = ? AND room_id = ?`,
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
            `SELECT * FROM room_visited WHERE user_id = ?`,
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