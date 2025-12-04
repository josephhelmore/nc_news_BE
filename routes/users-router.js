const express = require("express");
const router = express.Router();

const getControllers = require('../controllers/get-controllers');


router.get("/users", getControllers.getUsers);

module.exports = router;
