const { create,emailCheck, getUsers, getUserById, getUserByEmail, updateUserType, addStudentDetails, checkStudentDetailsExist, 
        updateStudentDetails, addEmployeeDetails, checkEmployeeDetailsExist, updateEmployeeDetails, checkVisitorDetailsExist, 
        updateVisitorDetails,addVisitorDetails,updateEmployeeDocs, updateStudentDocs, updateVisitorDocs,
        getEmployeeDetailsById, getVisitorDetailsById, getStudentDetailsById, getAllUsers, updateUserRecoveryPassword, sendLinkToEmail, checkIfEmailAndRecoveryPasswordMatched, updateUserPassword} = require("./user.service");
const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const { sign } = require("jsonwebtoken")
var generator = require('generate-password');

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

    getAllUsers: (req, res) => {

        getAllUsers(async (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
            }
            
            if(results === undefined){
                return res.status(200).json({
                    success: 0,
                    message: "No data found for this user"
                });
            }


            const queryResults = await Promise.all(
                
                results.map(async (user) => {
                    
                    if(user.type === 'Student'){
                          return new Promise((resolve, reject) => getStudentDetailsById(user.id, (err, results) => {
                             if (err) 
                               return reject(err)
                             else
                               return resolve({user_id: user.id, email: user.email, userType: user.type, information: results})
                           })
                     )
                    }

                    if(user.type === 'Employee'){
                        return new Promise((resolve, reject) =>  getEmployeeDetailsById(user.id, (err, results) => {
                           if (err) 
                             return reject(err)
                           else
                             return resolve({user_id: user.id, email: user.email, userType: user.type, information: results})
                         })
                   )
                  }

                    if(user.type === 'Visitor'){
                        return new Promise((resolve, reject) => getVisitorDetailsById(user.id, (err, results) => {
                           if (err) 
                             return reject(err)
                           else
                             return resolve({user_id: user.id, email: user.email, userType: user.type, information: results})
                         })
                   )
                  }
               
               })
             )



            return res.status(200).json({
                success: 1,
                data: queryResults
            });
        })
       
    },


    getStudentDetailsById: (req, res) => {
        const body = req.body;
            getStudentDetailsById(body.id, (err, results) => {
                if(err){
                    console.log(err)
                    return res.json({
                        success: 0,
                        message: "Database connection Error"
                    });
                }
                
                if(results === undefined){
                    return res.status(200).json({
                        success: 0,
                        message: "No data found for this user"
                    });
                }

                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });

    },

    getEmployeeDetailsById: (req, res) => {
        const body = req.body;
        
            getEmployeeDetailsById(body.id, (err, results) => {
                if(err){
                    console.log(err)
                    return res.json({
                        success: 0,
                        message: "Database connection Error"
                    });
                }

                if(results === undefined){
                    return res.status(200).json({
                        success: 0,
                        message: "No data found for this user"
                    });
                }
                
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });

    },

    getVisitorDetailsById: (req, res) => {
        const body = req.body;
            getVisitorDetailsById(body.id, (err, results) => {
                if(err){
                    console.log(err)
                    return res.json({
                        success: 0,
                        message: "Database connection Error"
                    });
                }

                if(results === undefined){
                    return res.status(200).json({
                        success: 0,
                        message: "No data found for this user"
                    });
                }
                
                
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });

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

    getUserDetailsById: (req, res) => {
        
        const id = req.body.id;
        
        getUserById(id, async (err, results) => {
            if(err){
                console.log(err)
                return res.json({
                    success: 0,
                    message: "Database connection Error"
                });
            }

            if(results === undefined){
                return res.json({
                    success: 0,
                    message: "User id not found"
                });
            }

            if(results.type === 'Student'){
                return new Promise((resolve, reject) => getStudentDetailsById(id, (err, finalResults) => {
                    if (err) 
                        return reject(err)
                    else
                        res.status(200).json({
                            success: 1,
                            user_id: id,
                            type: results.type,
                            email: results.email,
                            data: finalResults
                        });
                        return resolve()
                    })
                )
            }
                
            if(results.type === 'Employee'){
                return new Promise((resolve, reject) =>  getEmployeeDetailsById(id, (err, finalResults) => {
                    if (err) 
                    return reject(err)
                    else
                        res.status(200).json({
                            success: 1,
                            user_id: id,
                            type: results.type,
                            email: results.email,
                            data: finalResults
                        });
                        return resolve()
                    })
                )
            }
            
            if(results.type === 'Visitor'){
                return new Promise((resolve, reject) => getVisitorDetailsById(id, (err, finalResults) => {
                    if (err) 
                        return reject(err)
                    else
                        res.status(200).json({
                            success: 1,
                            user_id: id,
                            type: results.type,
                            email: results.email,
                            data: finalResults
                        });
                        return resolve()
                    })
                ) 
            }
                
            return res.status(200).json({
                success: 1,
                user_id: id,
                type: results.type,
                email: results.email,
                data: 'Not verified'
            });

        })
        
    },


    getUserDetailsByIds: async (req, res) => {
        
        const ids = req.body.id_lists;
        
        const queryResults = await Promise.all(
            ids.map(async (id) => {
                    return new Promise((resolve, reject) => getUserById(id, async (err, results) => {
                       if (err) 
                         return reject(err)
                       else {

                        if(results === undefined){
                            return resolve({information: 'User not found'})
                        }

                        if(results.type === 'Student'){
                            const newQueryResults = new Promise((resolve, reject) => getStudentDetailsById(id, async (err, finalResults) => {
                                if(err)
                                    return reject(err)
                                else{
                                    
                                    if(finalResults === undefined){
                                        results['data'] = 'Not verified'
                                        return resolve({information: results})
                                    }

                                    results['data'] = finalResults
                                    return resolve({information: results})
                                }
                            }))

                            return resolve(newQueryResults)
                        }
                        if(results.type === 'Visitor'){
                            const newQueryResults = new Promise((resolve, reject) => getVisitorDetailsById(id, async (err, finalResults) => {
                                if(err)
                                    return reject(err)
                                else{
                                    if(finalResults === undefined){
                                        results['data'] = 'Not verified'
                                        return resolve({information: results})
                                    }
                                    results['data'] = finalResults
                                    return resolve({information: results})
                                }
                            }))
                            return resolve(newQueryResults)
                        }
                        if(results.type === 'Employee'){
                            const newQueryResults = new Promise((resolve, reject) => getEmployeeDetailsById(id, async (err, finalResults) => {
                                if(err)
                                    return reject(err)
                                else{
                                    if(finalResults === undefined){
                                        results['data'] = 'Not verified'
                                        return resolve({information: results})
                                    }
                                    results['data'] = finalResults
                                    return resolve({information: results})
                                }
                            }))
                            return resolve(newQueryResults)
                        }
                        
                            results['data'] = 'Not verified'
                            return resolve({information: results})

                        
                       }
                     }))
            })
                     
        )

        return res.json({
            success: 1,
            results: queryResults
        })

    },

    sendRecoveryPasswordViaEmail: (req, res) => {
        const body = req.body

        emailCheck(body, (err, results) => {
            if(err){
                return res.json({
                    success: false,
                    message: err.message
                })
            }

            if(results.length === 0){
                return res.json({
                    success: false,
                    message: "Email is not registered yet."
                })
            }

            body['recovery_password'] = generator.generate({
                length: 10,
                numbers: true,
                exclude: '/'
            });

            let returnedResults = results[0];

            updateUserRecoveryPassword({recovery_password: body.recovery_password, id: returnedResults.id},async (err, finalResults) => {
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
    },
    updateUserPassword: (req, res) => {
        const body = req.body

        return res.json({
            body
        })
    },
    checkRecoveryPasswordAndEmailMatched: (req, res) => {
        const body = req.body
        
        checkIfEmailAndRecoveryPasswordMatched(body, (err, results) => {
            if(err){
               return res.json({ 
                    success: false,
                    message: err.message   
                })
            }

            if(results.length === 0){
                return res.json({
                    success: false,
                    message: 'Recovery password do not matched. Please try again'
                })
            }

            return res.json({
                success: true,
                results: results
            })

            
        })

    },

    updateUserPasswordFromRecovery: (req, res) => {
        const body = req.body

        checkIfEmailAndRecoveryPasswordMatched(body, (err, results) => {
            if(err){
               return res.json({ 
                    success: false,
                    message: err.message   
                })
            }

            if(results.length === 0){
                return res.json({
                    success: false,
                    message: 'Recovery password do not matched. Please try again'
                })
            }

            let returnedResults = results[0]

            const salt = genSaltSync(10);
            body.new_password = hashSync(body.new_password, salt)
            
            updateUserPassword({id: returnedResults.id, new_password: body.new_password}, (err, finalResults) => {
                if(err){
                    return res.json({
                        success: false,
                        message: err.message
                    })
                }

                return res.json({
                    success: true,
                    message: 'Password updated successfully',
                    finalResults
                })

            })
        })
    }

}