const router = require("express").Router()
const {  uploadUserImageProfile } = require("./files.controller");

router.post("/uploadUserImageProfile", uploadUserImageProfile)
// router.post("/uploadUserId", checkToken, searchEmergencyReportsViaDate)
// router.post("/uploadUserProofDoc", checkToken, searchEmergencyReportsViaDate)

module.exports = router;