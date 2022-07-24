const {getAdminByEmail, createAdmin, emailAdminCheck, addAdminRecoveryPassword, sendLinkToEmail} = require("./admin.service");
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
                    message: "Email/Username already have an account"
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

    },
    resetAdminPassword: (req, res) => {
        const body = req.body

        emailAdminCheck(body, (err, results) => {
            if(err)
            {
                return res.json({
                    success: false,
                    message: err.message
                })
            }

            if(results.length === 0){
                return res.json({
                    success: false,
                    message: 'Email is not registered as an admin'
                })
            }

            const salt = genSaltSync(10);
            body['recovery_password'] = hashSync('143', salt)

            addAdminRecoveryPassword(body, async (err, results) => {

                    if(err){
                        return res.json({
                            success: false,
                            message: err.message
                        })
                    }

                    await new Promise((resolve, reject) => {
                        sendLinkToEmail(body, (err, results) => {
                            if(err)
                            return reject(res.json({
                                success: false,
                                message: err.message
                            }))

                            
                            return resolve(res.json({
                                    success: true,
                                    data: results,
                                    message: 'Recovery password was sent to your email',
                            }))
                        })

                    })
            })
        })
      
    }
}