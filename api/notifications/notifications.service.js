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

}
