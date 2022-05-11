const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const { insertVaccineData, updateVaccineInfo } = require("./vaccination.controller");

router.post("/updateVaccineInfo",checkToken, updateVaccineInfo)
router.post("/insertVaccineInfo",checkToken, insertVaccineData)

module.exports = router;