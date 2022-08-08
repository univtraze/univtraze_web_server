const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const { insertVaccineData, updateVaccineData, addVaccineData} = require("./vaccination.controller");

router.post("/insertVaccineInfo",checkToken, insertVaccineData)
router.post("/updateVaccineInfo",checkToken, updateVaccineData)
router.post("/addVaccineData", checkToken, addVaccineData)
module.exports = router;