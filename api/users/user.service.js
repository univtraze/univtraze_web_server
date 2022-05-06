const pool = require("../../config/database");

module.exports = {
    emailCheck: (data, callBack ) => {
        pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [
                data.email
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO users(email, provider, password, type) 
                         VALUES (?,?,?, NULL)`,
            [
                data.email,
                data.provider,
                data.password,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    getUsers: callBack => {
        pool.query(
            `SELECT id, type, email, provider, password, createdAt, updatedAt FROM users WHERE 1`,
            [],
            (error, results, fields) => {
                if(error){
                    return callBack(error)
                }
                return callBack(null, results);
            }
        )
    },
    getUserById: (id, callBack) => {
        pool.query(
            `SELECT id, type, email, provider FROM users WHERE id = ?`,
            [
            id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error)
                }
                return callBack(null, results[0]);
            }
        )
    },
    getUserByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [
            email
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results[0])
            }
        )
    },

    updateUserType: (data, callBack) => {
        pool.query(
            `UPDATE users SET type=? WHERE id = ?`,
            [
                data.type,
                data.id,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    checkStudentDetailsExist: (data, callBack) => {
        pool.query(
            `SELECT * FROM student_details WHERE user_id = ?`,
            [
                data.user_id,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    updateStudentDetails: (data, callBack) => {
        pool.query(
           `UPDATE student_details SET firstname=?,lastname=?,middlename=?,suffix=?,gender=?,address=?,course=?,year_section=?,birthday=?,student_id=?,email=? WHERE user_id=?`,
            [
                data.firstname,
                data.lastname,
                data.middlename,
                data.suffix,
                data.gender,
                data.address,
                data.course,
                data.year_section,
                data.birthday,
                data.student_id,
                data.email,
                data.user_id,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    updateStudentDetails: (data, callBack) => {
        pool.query(
           `UPDATE student_details SET firstname=?,lastname=?,middlename=?,suffix=?,gender=?,address=?,course=?,year_section=?,birthday=?,student_id=?,email=? WHERE user_id=?`,
            [
                data.firstname,
                data.lastname,
                data.middlename,
                data.suffix,
                data.gender,
                data.address,
                data.course,
                data.year_section,
                data.birthday,
                data.student_id,
                data.email,
                data.user_id,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    updateStudentDocs: (data, callBack) => {
        pool.query(
           `UPDATE student_details SET school_id_img=?,mobile_number=?,profile_url=? WHERE user_id=?`,
            [
                data.school_id_img,
                data.mobile_number,
                data.profile_url,
                data.user_id,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    addStudentDetails: (data, callBack) => {
        pool.query(
            `INSERT INTO student_details(user_id, firstname, lastname, middlename, suffix, gender, address, course, year_section, birthday, student_id, email) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.user_id,
                data.firstname,
                data.lastname,
                data.middlename,
                data.suffix,
                data.gender,
                data.address,
                data.course,
                data.year_section,
                data.birthday,
                data.student_id,
                data.email,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },


    checkEmployeeDetailsExist: (data, callBack) => {
        pool.query(
            `SELECT * FROM employee_details WHERE user_id = ?`,
            [
                data.user_id,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    updateEmployeeDetails: (data, callBack) => {
        pool.query(
            `UPDATE employee_details SET firstname=?,lastname=?,middlename=?,suffix=?,gender=?,address=?,department=?,position=?,birthday=?,employee_id=?,email=? WHERE user_id=?`,
            [
                data.firstname,
                data.lastname,
                data.middlename,
                data.suffix,
                data.gender,
                data.address,
                data.department,
                data.position,
                data.birthday,
                data.employee_id,
                data.email,
                data.user_id,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    updateEmployeeDocs: (data, callBack) => {
        pool.query(
           `UPDATE employee_details SET employee_id_img=?,mobile_number=?,profile_url=? WHERE user_id=?`,
            [
                data.employee_id_img,
                data.mobile_number,
                data.profile_url,
                data.user_id,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    addEmployeeDetails: (data, callBack) => {
        pool.query(
            `INSERT INTO employee_details(user_id, firstname, lastname, middlename, suffix, gender, address, department, position, birthday, employee_id, email) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.user_id,
                data.firstname,
                data.lastname,
                data.middlename,
                data.suffix,
                data.gender,
                data.address,
                data.department,
                data.position,
                data.birthday,
                data.employee_id,
                data.email,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    checkVisitorDetailsExist: (data, callBack) => {
        pool.query(
            `SELECT * FROM visitor_details WHERE user_id = ?`,
            [
                data.user_id,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },


    updateVisitorDetails: (data, callBack) => {
        pool.query(
            `UPDATE visitor_details SET firstname=?,lastname=?,middlename=?,suffix=?,gender=?,address=?,birthday=?,valid_id=?,email=? WHERE user_id=?`,
            [
                data.firstname,
                data.lastname,
                data.middlename,
                data.suffix,
                data.gender,
                data.address,
                data.birthday,
                data.valid_id,
                data.email,
                data.user_id,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },
    updateVisitorDocs: (data, callBack) => {
        pool.query(
           `UPDATE visitor_details SET valid_id_img=?,mobile_number=?,profile_url=? WHERE user_id = ?`,
            [
                data.valid_id_img,
                data.mobile_number,
                data.profile_url,
                data.user_id,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    addVisitorDetails: (data, callBack) => {
        pool.query(
            `INSERT INTO visitor_details (user_id, firstname, lastname, middlename, suffix, gender, address, birthday, valid_id, email) 
            VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [
                data.user_id,
                data.firstname,
                data.lastname,
                data.middlename,
                data.suffix,
                data.gender,
                data.address,
                data.birthday,
                data.valid_id,
                data.email,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    getStudentDetailsById: (id, callBack) => {
        pool.query(
            `SELECT users.id, users.type, student_details.firstname, student_details.middlename, student_details.lastname, student_details.suffix FROM users, student_details WHERE users.id = ? AND student_details.user_id = ?`,
            [
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results[0]);
            }
        )
    },

    getVisitorDetailsById: (id, callBack) => {
        pool.query(
            `SELECT users.id, users.type, visitor_details.firstname, visitor_details.middlename, visitor_details.lastname, visitor_details.suffix FROM users, visitor_details WHERE users.id = ? AND visitor_details.user_id = ?`,
            [
                id,
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error)
                }
                return callBack(null, results[0]);
            }
        )
    },
    
    getEmployeeDetailsById: (id, callBack) => {
        pool.query(
            `SELECT users.id, users.type, employee_details.firstname, employee_details.middlename, employee_details.lastname, employee_details.suffix FROM users, employee_details WHERE users.id = ? AND employee_details.user_id = ?`,
            [
                id,
                id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error)
                }
                return callBack(null, results[0]);
            }
        )
    },

    
};