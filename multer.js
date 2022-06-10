const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './api/uploads')
    },

    filename: function (req, file, cb){
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

//File validation

const fileFilter = (req, res, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif'){
        cd(null, true)
    } else {
        cb({message: 'Unsupported file format'}, false)
    }
}

const uploads = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024},
    fileFilter: fileFilter
})

module.exports = uploads;