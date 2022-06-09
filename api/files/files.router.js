const router = require("express").Router()
const {  uploadUserImageProfile } = require("./files.controller");

router.post("/uploadUserImageProfile", (req, res) =>{
    const body = req.body;

    res.json({
        hello: "Hello",
        body: body   
    })
})
// router.post("/uploadUserId", checkToken, searchEmergencyReportsViaDate)
// router.post("/uploadUserProofDoc", checkToken, searchEmergencyReportsViaDate)

module.exports = router;