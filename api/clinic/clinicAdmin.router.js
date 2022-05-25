const router = require("express").Router();
const { createClinicAdmin } = require("./clinicAdmin.controller");
const { checkToken } = require("../../auth/token_validator");

router.post("/createClinicAdmin", createClinicAdmin)

module.exports = router;