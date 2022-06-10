const router = require("express").Router()

router.post("/uploadUserImageProfile", checkToken, uploadUserImageProfile)

module.exports = router;