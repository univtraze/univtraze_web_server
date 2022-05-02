const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        const token = req.get("authorization");

        if(token){
            const decode = verify(token, process.eventNames.JSON_KEY);
            console.log(token)
        } else {
            res.json({
                success: 0,
                message: "Access denied, unauthorized user."
            })
        }
    }
}
