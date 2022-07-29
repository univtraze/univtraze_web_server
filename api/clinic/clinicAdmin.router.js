const router = require("express").Router();
const { createClinicAdmin, loginClinicAdmin, getAllTotalCases } = require("./clinicAdmin.controller");
const { checkToken } = require("../../auth/token_validator");

router.post("/createClinicAdmin", createClinicAdmin)
router.post("/loginClinicAdmin", loginClinicAdmin)
router.get("/getAllTotalCases",checkToken, getAllTotalCases )

module.exports = router;