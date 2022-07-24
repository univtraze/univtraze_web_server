const router = require("express").Router()
const { checkToken } = require("../../auth/token_validator");
const { adminNotifications, updateAdminNotificationStatus, getTotalActiveAdminNotifications} = require("./notifications.controller");

router.post("/getAdminNotifications", checkToken, adminNotifications)
router.post("/updateAdminNotificationStatus", checkToken, updateAdminNotificationStatus)
router.get("/getTotalActiveAdminNotifications", checkToken, getTotalActiveAdminNotifications)

module.exports = router;