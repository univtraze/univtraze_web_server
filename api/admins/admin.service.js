const pool = require("../../config/database");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    service: "gmail",
    auth: {
      user: 'univtraze.2022@gmail.com',
      pass:  process.env.EMAIL_PASSWORD
    }

});


module.exports = {
    emailAdminCheck: (data, callBack ) => {
        pool.query(
            `SELECT * FROM admins WHERE email = ? || username = ?`,
            [
                data.email,
                data.username
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                }
                    return callBack(null, results)
            }
        )
    },

    createAdmin: (data, callBack) => {
        pool.query(
            `INSERT INTO admins(username, email, password) 
                         VALUES (?,?,?)`,
            [
                data.username,
                data.email,
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

    getAdminByEmail: (data, callBack) => {
        pool.query(
            `SELECT * FROM admins WHERE email = ? || username = ?`,
            [
                data.email,
                data.username
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results[0])
            }
        )
    },

    addAdminRecoveryPassword: (data, callBack) => {
        pool.query(
            `UPDATE admins SET recovery_password=? WHERE email = ?`,
            [
                data.recovery_password,
                data.email
            ],
            (error, results, fields) =>{
                if(error){
                    return callBack(error)
                }
                    return callBack(null, results[0])
            }
        )
    },

    sendLinkToEmail: (data, callBack) => {

        let link = `https://admin.univtraze.net/reset-password-from-email/${data.email}&${data.recovery_password}`

        var mailOptions = {
            from: "Univtraze Admin",
            to: data.email,
            subject: "Univtraze Recovery Password",
            text: "Admin password reset request.",
            html: `This email is requesting for new password for Univtraze Admin credentials: <br /> Please click this link to continue: <a href=${link}>Link</a>`
          };
        
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return callBack(error);
            } else {
                return callBack(null, info.response);
            }
          });
    }
};