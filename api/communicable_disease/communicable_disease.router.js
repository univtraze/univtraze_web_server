const router = require("express").Router();
const {checkToken } = require("../../auth/token_validator");
const {getAllCommunicableDisease, getCommunicableDiseaseByName,updateCommunicableDiseaseCaseStatus}  = require('./communicable_disease.controller')

router.get("/getAllCommunicableDisease", checkToken, getAllCommunicableDisease)
router.post("/getCommunicableDiseaseByName", checkToken, getCommunicableDiseaseByName)
router.post("/updateCommunicableDiseaseCaseStatus", checkToken, updateCommunicableDiseaseCaseStatus)


module.exports = router;