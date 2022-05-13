const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const { addCovidPositive } = require("./covid_case.controller");

router.post("/addCovidPositive", checkToken, addCovidPositive)

module.exports = router;