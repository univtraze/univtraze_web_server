const {addRoom, getAllRooms, addVisitedRoom, searchRoomNumber, userVisitedRooms} = require("./room.controller")
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator")

router.post("/addRoom", checkToken, addRoom)
router.post("/allRooms", checkToken, getAllRooms)
router.post("/addVisitedRoom", checkToken, addVisitedRoom)
router.post("/searchRoom", checkToken, searchRoomNumber)
router.post("/userVisitedRooms", checkToken, userVisitedRooms)


module.exports = router;