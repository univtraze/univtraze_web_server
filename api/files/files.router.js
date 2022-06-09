const router = require("express").Router()
// const {  uploadUserImageProfile } = require("./files.controller");

router.post("/uploadUserImageProfile", (req, res) =>{
    const body = req.body;

    return res.json({
       body 
    })
})

module.exports = router;