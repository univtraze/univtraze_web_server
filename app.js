require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const adminRouter = require("./api/admins/admin.router")
const vaccination_info = require("./api/vaccination_info/vaccination.router")

const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin: "*",
}));

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/vaccine_info", vaccination_info);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('Server up and Running on Port: ', process.env.PORT)
})