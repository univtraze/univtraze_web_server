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
            `INSERT INTO room_visited(user_id, room_id, temperature) VALUES (?,?,?)`,
            [
                data.user_id,
                data.room_id,
                data.temp
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

    userTodaysTemperature: (data, callBack) => {
        pool.query(
            `SELECT id, user_id, room_id, temperature, createdAt, updatedAt FROM room_visited where createdAt between ? and CONCAT(?, ' 23:59:59') and user_id = ? ORDER BY id desc limit 1`,
            [   
                data.dataToday,
                data.dataToday,
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

    addUserNotification: (data, callBack) => {
        pool.query(
            `INSERT INTO notifications(user_id, notification_for, notification_description) VALUES (?,?,?)`,
            [
                data.user_id,
                data.notification_for,
                data.notification_description
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