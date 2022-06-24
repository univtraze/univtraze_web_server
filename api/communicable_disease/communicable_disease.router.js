const router = require("express").Router();
const {checkToken } = require("../../auth/token_validator");
const {getAllCommunicableDisease, getCommunicableDiseaseByName}  = require('./communicable_disease.controller')

router.get("/getAllCommunicableDisease", checkToken, getAllCommunicableDisease)
router.get("/getCommunicableDiseaseByName", checkToken, getCommunicableDiseaseByName)

module.exports = router;