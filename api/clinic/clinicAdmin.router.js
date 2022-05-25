const router = require("express").Router();
const { createClinicAdmin, loginClinicAdmin } = require("./clinicAdmin.controller");
const { checkToken } = require("../../auth/token_validator");

router.post("/createClinicAdmin", createClinicAdmin)
router.post("/loginClinicAdmin", loginClinicAdmin)

module.exports = router;