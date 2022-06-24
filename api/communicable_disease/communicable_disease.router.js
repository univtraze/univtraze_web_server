const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const {getAllCommunicableDisease }  = require('./communicable_disease.controller')

router.get("/getAllCommunicableDisease", checkToken, getAllCommunicableDisease)

module.exports = router;