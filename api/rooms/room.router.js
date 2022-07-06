const {addRoom, getAllRooms, addVisitedRoom, searchRoomNumber, userVisitedRooms, addUserNotification, userTodaysTemperature} = require("./room.controller")
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validator")

router.post("/addRoom", checkToken, addRoom)
router.get("/allRooms", checkToken, getAllRooms)
router.post("/addVisitedRoom", checkToken, addVisitedRoom)
router.post("/searchRoom", checkToken, searchRoomNumber)
router.post("/userVisitedRooms", checkToken, userVisitedRooms)
router.post("/userTemperatureHistory", checkToken, userVisitedRooms)
router.post("/userTodaysTemperature", checkToken, userTodaysTemperature)
// router.post("/addUserNotification", checkToken, addUserNotification)


module.exports = router;