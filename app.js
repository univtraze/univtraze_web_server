require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");

app.use(express.json());
app.use("/api/user", userRouter);

const port = "univtraze.herokuapp.com";

app.listen(port, () => {
    console.log('Server up and Running on Port: ', process.env.PORT)
})