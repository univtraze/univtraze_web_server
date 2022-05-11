const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const { insertVaccineData, updateVaccineInfo } = require("./vaccination.service");

router.post("/updateVaccineInfo",checkToken, updateVaccineInfo)
router.post("/insertVaccineInfo",checkToken, (req, res) => {
    res.json({
        message: 'Working fine'
    })
})

module.exports = router;