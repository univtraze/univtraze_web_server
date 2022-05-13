const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const { addCovidPositive, addEmergencyReport } = require("./covid_case.controller");

router.post("/addCovidPositive", checkToken, addCovidPositive)
router.post("/addEmergencyReport", checkToken, addEmergencyReport)

module.exports = router;