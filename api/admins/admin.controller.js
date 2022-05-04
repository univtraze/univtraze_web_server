const {getAdminByEmail, createAdmin, emailAdminCheck} = require("./admin.service");
const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const { sign } = require("jsonwebtoken")

module.exports = {
    createAdmin: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)

        emailAdminCheck(body, (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
            }

            if(results.length !== 0){
                return res.json({
                    success: 0,
                    message: "Email already have an account"
                });
            }

            createAdmin(body, (err, results) => {
                if(err){
                    console.log(err)
                    return res.json({
                        success: 0,
                        message: "Database connection Error"
                    });
                }
    
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });

        });
    },

    loginAdmin: (req, res) => {
        const body = req.body;

        getAdminByEmail(body, (err, results) => {
            if(err) {
                console.log(err );
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "Incorrect Email or Password"
                })
            }

            const result = compareSync(body.password, results.password);

            if(result) {
                result.password = undefined;
                const jsonToken = sign({result: results}, process.env.JSON_KEY, {
                    expiresIn: "7d"
                })

                return res.json({
                    success: 1,
                    message: "Login successfully",
                    token: jsonToken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Incorrect Email or Password"
                })
            }
        });

    }

}