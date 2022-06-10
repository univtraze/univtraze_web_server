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

//THis is where cloudinary staart
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')



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

app.post('/photos/upload', fileUpload.array('image', 5), function (req, res, next) {
    console.log("Images ", req.file);  
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('Server up and Running on Port: ', process.env.PORT)
})
