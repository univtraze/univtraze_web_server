const { createUser, getUserById, getUsers, login, updateUserType} = require("./user.controller")

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator")

router.post("/signup", createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserById);
router.post("/login", login)
router.post("/updateUserType",checkToken, updateUserType)

module.exports = router;