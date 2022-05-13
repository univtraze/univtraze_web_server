

module.exports = {
    addCovidPositive: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)

        return res.json({
            success: 1,
            message: "Test Success"
        });

        // addCovidPositive(body, (err, results) => {
        //     if(err){
        //         console.log(err)
        //         return res.json({
        //             success: 0,
        //             message: "Database connection Error"
        //         });
        //     }

        //     if(results.length !== 0){
        //         return res.json({
        //             success: 0,
        //             message: "Email already have an account"
        //         });
        //     }

        // });
    },
}