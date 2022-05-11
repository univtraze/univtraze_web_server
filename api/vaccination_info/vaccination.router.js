const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const { insertVaccineData } = require("./vaccination.controller");

router.post("/insertVaccineInfo",checkToken, insertVaccineData)

module.exports = router;