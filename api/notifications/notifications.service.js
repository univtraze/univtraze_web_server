const pool = require('../../config/database');

module.exports = {
    getAdminNotifications: (data, callBack) => {
        pool.query(
            `SELECT * FROM admin_notifications  where notification_for = ? ORDER BY createdAt LIMIT ? OFFSET ?`,
            [   
                data.notification_for,
                data.page_limit,
                data.start_at - 1
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    updateAdminNotificationStatus: (data, callBack) => {
        pool.query(
            `UPDATE admin_notifications SET notification_is_viewed= ?  WHERE id = ?`,
            [   
                data.is_viewed,
                data.id
               
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    getTotalActiveAdminNotifications: (callBack) => {
        pool.query(
            `SELECT COUNT(notification_is_viewed) AS total_active_notifications FROM admin_notifications WHERE notification_is_viewed = 0`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    getClinicNotifications: (data, callBack) => {
        pool.query(
            `SELECT * FROM clinic_notifications  where notification_for = ? ORDER BY createdAt LIMIT ? OFFSET ?`,
            [   
                data.notification_for,
                data.page_limit,
                data.start_at - 1
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    getTotalActiveClinicNotifications: (callBack) => {
        pool.query(
            `SELECT COUNT(notification_is_viewed) AS total_active_notifications FROM clinic_notifications WHERE notification_is_viewed = 0`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    updateClinicNotificationStatus: (data, callBack) => {
        pool.query(
            `UPDATE clinic_notifications SET notification_is_viewed= ?  WHERE id = ?`,
            [   
                data.is_viewed,
                data.id
               
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },


}
