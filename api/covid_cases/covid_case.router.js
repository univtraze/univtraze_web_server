const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const { addCovidPositive, addEmergencyReport, addDailyAssessment, searchEmergencyReportsViaDate, addCommunicableDiseaseCase, getAllEmergencyReports } = require("./covid_case.controller");

router.post("/addCovidPositive", checkToken, addCovidPositive)
router.post("/addEmergencyReport", checkToken, addEmergencyReport)
router.post("/addDailyAssessment", checkToken, addDailyAssessment)
router.post("/searchEmergencyReportsViaDate", checkToken, searchEmergencyReportsViaDate)
router.post("/addCommunicableDiseaseCase", checkToken, addCommunicableDiseaseCase)
router.post("/getAllEmergencyReports", checkToken, getAllEmergencyReports)

module.exports = router;