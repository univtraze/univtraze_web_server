const {addRoom, getAllRooms, addVisitedRoom} = require("./room.controller")
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator")

router.post("/addRoom", checkToken, addRoom)
router.post("/allRooms", checkToken, getAllRooms)
router.post("/addVisitedRoom", checkToken, addVisitedRoom)

module.exports = router;