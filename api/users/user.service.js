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
            `SELECT id, type, email, provider, password, createdAt, updatedAt FROM users WHERE id = ?`,
            [id],
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


    
};