const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const {getFirstDegreeVictims, getSecondDegreeVictims} = require("./victims.controller");

router.post("/getFirstDegreeVictims",checkToken, getFirstDegreeVictims)
router.post("/getSecondDegreeVictims",checkToken, getSecondDegreeVictims)

module.exports = router;