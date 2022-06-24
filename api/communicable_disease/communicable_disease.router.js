const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator");
const {getAllCommunicableDisease }  = require('./communicable_disease.controller')

router.get("/getAllCommunicableDisease", checkToken,     (req, res) => {
        return res.json({
            // success: 1,
            // data: results
            message: "Hello world"
        })
    })

module.exports = router;