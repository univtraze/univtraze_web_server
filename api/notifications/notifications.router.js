const router = require("express").Router()
const { checkToken } = require("../../auth/token_validator");
const { adminNotifications } = require("./notifications.controller");

router.post("/getAdminNotifications", checkToken, adminNotifications)

module.exports = router;