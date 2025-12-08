const { postCommentToArticle } = require("../models/post-models");
const { validNumber } = require("./controller-error-handling");

const postComment = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const { body, username } = req.body;

    if (!body || !username) {
      return next({ status: 400, message: "Bad Request" });
    }

    await validNumber(article_id);

    const comment = await postCommentToArticle(username, body, article_id);
    res.status(201).send({ comment });
  } catch (err) {
    next(err);
  }
};

module.exports = { postComment };
