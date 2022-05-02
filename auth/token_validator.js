const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        const token = req.get("authorization");

        if(token){
            verify(token, process.eventNames.JSON_KEY, (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "Invalid token"
                    })
                } else {
                    console.log(token)
                    // next();
                }
            })

            

        } else {
            res.json({
                success: 0,
                message: "Access denied, unauthorized user."
            })
        }
    }
}
