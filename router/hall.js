const express = require("express");

const router = express.Router();

const getModule = require("../module/hall");

router.get("/read", getModule.readroom);

router.post("/createroom", getModule.createroom);

router.post("/createBook", getModule.createBookRoom);

router.post("/createBookdata", getModule.createBookeddata);

router.get("/createRoomList", getModule.createBookedRoomList);

router.get("/createCustomerList", getModule.createCustomerData);

module.exports = router;
