const router = require("express").Router()
const { checkToken } = require("../../auth/token_validator");

router.post("/uploadUserImageProfile", checkToken, uploadUserImageProfile)

module.exports = router;