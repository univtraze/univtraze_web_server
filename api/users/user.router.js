const { createUser, getUserById, getUsers, login } = require("./user.controller")

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator")

router.post("/signup", createUser);
router.get("/", checkToken, getUsers);
router.get("/:id", getUserById);
router.post("/login", login)

module.exports = router;