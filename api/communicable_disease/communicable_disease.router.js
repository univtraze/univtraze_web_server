const router = require("express").Router();
const {checkToken } = require("../../auth/token_validator");
const {getAllCommunicableDisease, getCommunicableDiseaseByName,updateCommunicableDiseaseCaseStatus, 
    deleteCommunicableDisease, getFirstDegreeCommunicableDisease, getAllDiseaseVictims, getAllCommunicableDiseaseReported}  = require('./communicable_disease.controller')

router.get("/getAllCommunicableDisease", checkToken, getAllCommunicableDisease)
router.get("/getAllCommunicableDiseaseReported", checkToken, getAllCommunicableDiseaseReported)
router.post("/getCommunicableDiseaseByName", checkToken, getCommunicableDiseaseByName)
router.post("/updateCommunicableDiseaseCaseStatus", checkToken, updateCommunicableDiseaseCaseStatus)
router.post("/deleteCommunicableDisease", checkToken, deleteCommunicableDisease)
router.post("/getFirstDegreeCommunicableDisease", checkToken, getFirstDegreeCommunicableDisease)
router.post("/getAllDiseaseVictims", checkToken, getAllDiseaseVictims)


module.exports = router;