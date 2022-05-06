const { createUser, getUserById, getUsers, login, updateUserType, addStudentDetails, addEmployeeDetails, addVisitorDetails, updateStudentDocs,updateEmployeeDocs, updateVisitorDocs, getStudentDetailsById} = require("./user.controller")

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
router.post("/updateStudentDocs",checkToken, updateStudentDocs)
router.post("/updateEmployeeDocs",checkToken, updateEmployeeDocs)
router.post("/updateVisitorDocs",checkToken, updateVisitorDocs)
router.get("/student=:id", checkToken, getStudentDetailsById);



module.exports = router;