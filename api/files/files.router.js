const router = require("express").Router()
// const {  uploadUserImageProfile } = require("./files.controller");

router.post("/uploadUserImageProfile", (req, res) => {
    const body = req.body;
    return res.json({
        success: 1,
        data: body
    });
})

module.exports = router;