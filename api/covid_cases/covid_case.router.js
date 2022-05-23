const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const { addCovidPositive, addEmergencyReport, addDailyAssessment, searchEmergencyReportsViaDate } = require("./covid_case.controller");

router.post("/addCovidPositive", checkToken, addCovidPositive)
router.post("/addEmergencyReport", checkToken, addEmergencyReport)
router.post("/addDailyAssessment", checkToken, addDailyAssessment)
router.post("/searchEmergencyReportsViaDate", checkToken, searchEmergencyReportsViaDate)

module.exports = router;