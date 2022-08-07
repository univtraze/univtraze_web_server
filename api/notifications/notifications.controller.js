const { getAdminNotifications, updateAdminNotificationStatus, getTotalActiveAdminNotifications,
    getClinicNotifications,
    getTotalActiveClinicNotifications,
    updateClinicNotificationStatus, sendEmergencyReportPrescriptionViaEmail, sendSendCommunicableDiseaseReportPrescriptionViaEmail} = require("./notifications.service");

const moment = require('moment')


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

    },
    getClinicNotifications: (req, res) => {

        const body = req.body;

        getClinicNotifications(body, (error, results) => {
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
    getTotalActiveClinicNotifications: (req, res) => {

        getTotalActiveClinicNotifications((error, results) => {
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

    },

    updateClinicNotificationsStatus: (req, res) => {

        const body = req.body

        updateClinicNotificationStatus(body, (err, results) =>{
            if(err){
                return res.json({
                    success: 0,
                    message: err.message
                })
            }

            return res.json({
                success: true,
                data: results
            })
        })
    },
    sendEmergencyReportPrescriptionViaEmail: (req, res) => {

        const body = req.body
        body['presecription_sent_date'] = moment().format('YYYY-MM-DD hh:mm a')

        sendEmergencyReportPrescriptionViaEmail(body, (err, results) => {
            if(err){
                return res.json(
                    {
                        success: 0,
                        message: "Error sending prescription via email" + err
                    }
                )
            }

            return res.json({
                success: 1,
                message: results
            })
        })
    },
    sendSendCommunicableDiseaseReportPrescriptionViaEmail: (req, res) => {

        const body = req.body
        body['presecription_sent_date'] = moment().format('YYYY-MM-DD hh:mm a')

        sendSendCommunicableDiseaseReportPrescriptionViaEmail(body, (err, results) => {
            if(err){
                return res.json(
                    {
                        success: 0,
                        message: "Error sending prescription via email" + err
                    }
                )
            }

            return res.json({
                success: 1,
                message: results
            })
        })
    }

}