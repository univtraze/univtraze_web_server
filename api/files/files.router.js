const router = require("express").Router()
const { checkToken } = require("../../auth/token_validator");
const {  uploadUserImageProfile } = require("./files.controller");

router.post("/uploadUserImageProfile", checkToken, uploadUserImageProfile)

module.exports = router;