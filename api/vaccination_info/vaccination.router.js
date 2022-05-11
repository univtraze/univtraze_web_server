const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const { insertVaccineData, updateVaccineData } = require("./vaccination.controller");

router.post("/insertVaccineInfo",checkToken, insertVaccineData)
router.post("/updateVaccineInfo",checkToken, updateVaccineData)

module.exports = router;