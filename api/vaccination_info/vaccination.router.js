const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const { insertVaccineData } = require("./vaccination.service");

router.post("/updateVaccineInfo",checkToken, updateVaccinationInfo)
router.post("/insertVaccineInfo",checkToken, insertVaccineData)

module.exports = router;