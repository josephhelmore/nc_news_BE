const express = require("express");
const router = express.Router();

const getControllers = require("../controllers/get-controllers");
const postControllers = require("../controllers/post-controllers");
const updateControllers = require("../controllers/update-controllers");

router.get("/", getControllers.getArticles);
router.get("/:article_id", getControllers.getArticleData);
router.get("/:article_id/comments", getControllers.getArticleComments);
router.patch("/:article_id", updateControllers.updateArticleVotes);
router.post("/:article_id/comments", postControllers.postComment);

module.exports = router;
