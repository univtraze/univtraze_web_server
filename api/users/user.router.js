const { createUser, getUserById, getUsers, login, updateUserType, addStudentDetails, addEmployeeDetails, addVisitorDetails} = require("./user.controller")

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator")

router.post("/signup", createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserById);
router.post("/login", login)
router.post("/updateUserType",checkToken, updateUserType)
router.post("/addStudentDetails",checkToken, addStudentDetails)
router.post("/addEmployeeDetails",checkToken, addEmployeeDetails)
router.post("/addVisitorDetails",checkToken, addVisitorDetails)



module.exports = router;