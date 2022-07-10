const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const {getFirstDegreeVictims} = require("./victims.controller");

router.post("/getFirstDegreeVictims",checkToken, getFirstDegreeVictims)

module.exports = router;