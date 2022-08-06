const router = require("express").Router()
const { checkToken } = require("../../auth/token_validator");
const { adminNotifications, updateAdminNotificationStatus, getTotalActiveAdminNotifications, getClinicNotifications, getTotalActiveClinicNotifications, updateClinicNotificationsStatus} = require("./notifications.controller");

router.post("/getAdminNotifications", checkToken, adminNotifications)
router.post("/updateAdminNotificationStatus", checkToken, updateAdminNotificationStatus)
router.get("/getTotalActiveAdminNotifications", checkToken, getTotalActiveAdminNotifications)
router.post("/getClinicNotifications", checkToken, getClinicNotifications)
router.post("/getTotalActiveClinicNotifications", checkToken, getTotalActiveClinicNotifications)
router.post("/updateClinicNotificationStatus", checkToken, updateClinicNotificationsStatus)

module.exports = router;