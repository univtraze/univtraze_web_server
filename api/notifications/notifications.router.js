const router = require("express").Router()
const { checkToken } = require("../../auth/token_validator");
const { adminNotifications, updateAdminNotificationStatus} = require("./notifications.controller");

router.post("/getAdminNotifications", checkToken, adminNotifications)
router.post("/updateAdminNotificationStatus", checkToken, updateAdminNotificationStatus)

module.exports = router;