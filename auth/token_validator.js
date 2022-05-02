const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        

        if(token){
            token = token.splice(5)
            
            verify(token, process.eventNames.JSON_KEY, (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "Invalid token"
                        
                    })
                    console.log('Invalid token' + token)
                } else {
                    console.log('Proceed next' + token)
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
