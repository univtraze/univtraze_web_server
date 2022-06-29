const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const { addCovidPositive, addEmergencyReport, addDailyAssessment, searchEmergencyReportsViaDate, addCommunicableDiseaseCase, getAllEmergencyReports, getAllEmergencyReportsResolved, getAllEmergencyReportsByStatus} = require("./covid_case.controller");

router.post("/addCovidPositive", checkToken, addCovidPositive)
router.post("/addEmergencyReport", checkToken, addEmergencyReport)
router.post("/addDailyAssessment", checkToken, addDailyAssessment)
router.post("/searchEmergencyReportsViaDate", checkToken, searchEmergencyReportsViaDate)
router.post("/addCommunicableDiseaseCase", checkToken, addCommunicableDiseaseCase)
router.get("/getAllEmergencyReports", checkToken, getAllEmergencyReports)
router.get("/getAllEmergencyReportsResolved", checkToken, getAllEmergencyReportsResolved)
router.post("/getAllEmergencyReportsByStatus", checkToken, getAllEmergencyReportsByStatus)

module.exports = router;