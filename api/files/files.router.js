const router = require("express").Router();
// const { checkToken } = require("../../auth/token_validator");
const {  uploadUserImageProfile } = require("./files.controller");

router.post("/uploadUserImageProfile", checkToken,  uploadUserImageProfile)
// router.post("/uploadUserId", checkToken, searchEmergencyReportsViaDate)
// router.post("/uploadUserProofDoc", checkToken, searchEmergencyReportsViaDate)

module.exports = router;