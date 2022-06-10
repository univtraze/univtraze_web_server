require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const adminRouter = require("./api/admins/admin.router");
const vaccination_info = require("./api/vaccination_info/vaccination.router");
const roomRouter = require("./api/rooms/room.router");
const covidCasesRouter = require("./api/covid_cases/covid_case.router");
const clinicRouter = require("./api/clinic/clinicAdmin.router");
// const fileRouter = require("./api/files/files.router")
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const upload = require('./config/multer')
const cloudinary = require('./config/cloudinary')
const fs = require('fs')

app.use(express.json());
app.use(cors({origin: "*"}));
app.use(fileUpload());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: false}));


app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/vaccine_info", vaccination_info);
app.use("/api/rooms", roomRouter);
app.use("/api/covid_cases", covidCasesRouter);
app.use("/api/clinic", clinicRouter);
// app.use("/api/files", fileRouter);

app.use('api/uploadImage', upload.array('image'), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'Images')
    if(req.method === 'POST'){
        const urls = []
        const files = req.files

        for(const file of files){
            const {path} = file
            const newPath = await uploader(path)
            urls.push(newPath)

            fs.unlinkSync(path)
        }

        res.status(200).json({
            success: 1,
            message: 'Image uploaded successfully',
            data: urls
        }) 
    } else {
        res.status(405).json({
            err: "Failed uploading images"
        })
    }
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('Server up and Running on Port: ', process.env.PORT)
})
