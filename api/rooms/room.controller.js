const { addRoom } = require("./room.service");

module.exports = {

    addRoom: (req, res) => {
        body = req.body    
            addRoom(body, (err, results) => {
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