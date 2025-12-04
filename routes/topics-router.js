const express = require("express");
const router = express.Router();

const getControllers = require("../controllers/get-controllers");

router.get("/topics", getControllers.getTopics);

module.exports = router;
