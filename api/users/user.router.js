const { createUser, getUsers, login, updateUserType, addStudentDetails, addEmployeeDetails, addVisitorDetails, updateStudentDocs,updateEmployeeDocs, updateVisitorDocs, getStudentDetailsById, getEmployeeDetailsById, getVisitorDetailsById} = require("./user.controller")

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator")

router.post("/signup", createUser);
router.get("/", checkToken, getUsers);
router.post("/login", login)
router.post("/updateUserType",checkToken, updateUserType)
router.post("/addStudentDetails",checkToken, addStudentDetails)
router.post("/addEmployeeDetails",checkToken, addEmployeeDetails)
router.post("/addVisitorDetails",checkToken, addVisitorDetails)
router.post("/updateStudentDocs",checkToken, updateStudentDocs)
router.post("/updateEmployeeDocs",checkToken, updateEmployeeDocs)
router.post("/updateVisitorDocs",checkToken, updateVisitorDocs)
router.post("/student", checkToken, getStudentDetailsById);
router.post("/employee", checkToken, getEmployeeDetailsById);
router.post("/visitor", checkToken, getVisitorDetailsById);

module.exports = router;