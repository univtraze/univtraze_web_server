const {createAdmin, loginAdmin} = require("./admin.controller")
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator")

router.post("/createAdmin", createAdmin)
router.post("/loginAdmin", loginAdmin)

module.exports = router;