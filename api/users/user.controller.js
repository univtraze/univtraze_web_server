const { create,emailCheck, getUsers, getUserById, getUserByEmail, updateUserType, addStudentDetails, addEmployeeDetails, addVisitorDetails, checkStudentDetailsExist, updateStudentDetails} = require("./user.service");
const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const { sign } = require("jsonwebtoken")

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)

        emailCheck(body, (err, results) => {
            
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

            create(body, (err, results) => {
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
    getUserById: (req, res) => {

        const id = req.params.id;

        getUserById(id, (err, results) => {
            if(err){
                console.log(err);
                return
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "User not found"
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })

    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err){
                console.log(err);
                return
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    login: (req, res) => {
        const body = req.body;

        getUserByEmail(body.email, (err, results) => {
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

    updateUserType: (req, res) => {
        const body = req.body;
            updateUserType(body, (err, results) => {
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

    },

    addStudentDetails: (req, res) => {
        
        const body = req.body;

        if(body.user_id === ''){
            return res.json({
                success: 0,
                message: "user id not found"
            });
        }

        checkStudentDetailsExist(body, (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
            }
            
            if(results.length === 0){
                if(body.firstname === '' || body.lastname === '' ||body.gender === ''||body.address === '' || body.course === '' || body.year_section === '' || body.birthday === '' || body.student_id === '' || body.email === ''){
                    return res.json({
                        success: 0,
                        message: "Some fields were empty!"
                    });
                }

                    addStudentDetails(body, (err, results) => {
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
            }

            if(results.length > 0){
                if(body.firstname === '' || body.lastname === '' ||body.gender === ''||body.address === '' || body.course === '' || body.year_section === '' || body.birthday === '' || body.student_id === '' || body.email === ''){
                    return res.json({
                        success: 0,
                        message: "Some fields were empty!"
                    });
                }

                updateStudentDetails(body, (err, results) => {
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
            }

        });


        
    },

    addEmployeeDetails: (req, res) => {
        const body = req.body;

            addStudentDetails(body, (err, results) => {
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

    },
    addVisitorDetails: (req, res) => {


        const body = req.body;

            addStudentDetails(body, (err, results) => {
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

    },
}