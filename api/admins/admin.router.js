const {createAdmin} = require("./admin.controller")
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator")

router.get("/createAdmin", createAdmin)

module.exports = router;