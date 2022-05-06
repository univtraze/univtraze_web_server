const { create,emailCheck, getUsers, getUserById, getUserByEmail, updateUserType, addStudentDetails, checkStudentDetailsExist, 
        updateStudentDetails, addEmployeeDetails, checkEmployeeDetailsExist, updateEmployeeDetails, checkVisitorDetailsExist, 
        updateVisitorDetails,addVisitorDetails,updateEmployeeDocs, updateStudentDocs, updateVisitorDocs,
        getEmployeeDetailsById, getVisitorDetailsById, getStudentDetailsById} = require("./user.service");
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
        const id = req.body.id;
        
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
            
            if(results.type === 'Student'){
                getStudentDetailsById(id, (err, results) => {
                    
                    if(err){
                        console.log(err);
                        return
                    }

                    return res.json({
                        success: 1,
                        data: results
                    })
                })


            }

            if(results.type === 'Employee'){

                // getEmployeeDetailsById(id, (err, results) => {
                //     return res.json({
                //         success: 1,
                //         data: 'Employee'  + id
                //     })
                    // if(err){
                    //     console.log(err);
                    //     return
                    // }
                    // return res.json({
                    //     success: 1,
                    //     data: results
                    // })
                // })
            }

            if(results.type === 'Visitor'){

                // getVisitorDetailsById(id, (err, results) => {
                //     return res.json({
                //         success: 1,
                //         data: 'Visitor' + id
                //     })
                    //     console.log(err);
                    //     return
                    // }
                    // return res.json({
                    //     success: 1,
                    //     data: results
                    // })
                // })
            }

            return res.json({
                success: 0,
                message: "User type not defined"
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

        if(body.user_id === ''){
            return res.json({
                success: 0,
                message: "user id not found"
            });
        }

        checkEmployeeDetailsExist(body, (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Erro around here"
                });
            }
            
            if(results.length === 0){
                if(body.firstname === '' || body.lastname === '' ||body.gender === ''||body.address === '' || body.department === '' || body.position === '' || body.birthday === '' || body.student_id === '' || body.email === ''){
                    return res.json({
                        success: 0,
                        message: "Some fields were empty!"
                    });
                }

                    addEmployeeDetails(body, (err, results) => {
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

                updateEmployeeDetails(body, (err, results) => {
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
    addVisitorDetails: (req, res) => {


        const body = req.body;

        if(body.user_id === ''){
            return res.json({
                success: 0,
                message: "user id not found"
            });
        }

        checkVisitorDetailsExist(body, (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Erro around here"
                });
            }
            
            if(results.length === 0){
                if(body.firstname === '' || body.lastname === '' ||body.gender === ''|| body.position === '' || body.birthday === '' || body.student_id === '' || body.email === ''){
                    return res.json({
                        success: 0,
                        message: "Some fields were empty!"
                    });
                }

                addVisitorDetails(body, (err, results) => {
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
                
                if(body.firstname === '' || body.lastname === '' ||body.gender === ''||body.address === ''|| body.birthday === '' || body.student_id === '' || body.email === ''){
                    return res.json({
                        success: 0,
                        message: "Some fields were empty!"
                    });
                }

                updateVisitorDetails(body, (err, results) => {
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

    updateStudentDocs: (req, res) => {
        const body = req.body;
            updateStudentDocs(body, (err, results) => {
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
    updateEmployeeDocs: (req, res) => {
        const body = req.body;
            updateEmployeeDocs(body, (err, results) => {
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

    updateVisitorDocs: (req, res) => {
        const body = req.body;
        
            updateVisitorDocs(body, (err, results) => {
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

    getStudentDetailsById: (req, res) => {
        const id = req.params.id

        return res.status(200).json({
            success: 1,
            data: id
        });

            // getStudentDetailsById(id, (err, results) =>{
            //     if(err){
            //         console.log(err)
            //         return res.json({
            //             success: 0,
            //             message: "Database connection Error"
            //         });
            //     }
                
            //     return res.status(200).json({
            //         success: 1,
            //         data: results
            //     });
            // });
    },


}