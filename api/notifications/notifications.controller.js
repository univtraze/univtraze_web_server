const { getAdminNotifications } = require("./notifications.service");

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
    }
}