const { getAdminNotifications, updateAdminNotificationStatus, getTotalActiveAdminNotifications } = require("./notifications.service");

module.exports = {
    adminNotifications: (req, res) => {
        const body = req.body;

        getAdminNotifications(body, (error, results) => {
            if (error) {
                return res.json({
                    success: 0,
                    message: error.message
                })
            }
            
            return res.json({
                success: 1,
                config: body,
                data: results
            })
        })
    },

    updateAdminNotificationStatus: (req, res) => {
        const body = req.body;

        updateAdminNotificationStatus(body, (error, results) => {
            if (error) {
                return res.json({
                    success: 0,
                    message: error.message
                })
            }
            
            return res.json({
                success: 1,
                config: body,
                data: results
            })
        })
    },

    getTotalActiveAdminNotifications: (req, res) => {

        getTotalActiveAdminNotifications((error, results) => {
            if (error) {
                return res.json({
                    success: 0,
                    message: error.message
                })
            }
            
            return res.json({
                success: 1,
                total_active_notifications: results[0].total_active_notifications
            })
        })

    }
}