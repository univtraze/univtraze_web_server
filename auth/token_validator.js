const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        const token = req.get("authorization");

        if(token){
            verify(token, process.eventNames.JSON_KEY, (err, decoded)=>{
                
                console.log(token)

                // if(err){
                //     res.json({
                //         success: 0,
                //         message: "Invalid token"
                //     })
                // } else {
                //     next();
                // }
            })

            

        } else {
            res.json({
                success: 0,
                message: "Access denied, unauthorized user."
            })
        }
    }
}
