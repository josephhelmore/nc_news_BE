const express = require("express");
const router = express.Router();

const deleteControllers = require('../controllers/delete-controllers');

router.delete("/:comment_id", deleteControllers.deleteCommentById);


module.exports = router;
