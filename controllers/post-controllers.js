const {postCommentToArticle} = require('../models/post-models')


const postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;

if (isNaN(Number(article_id))) {
    return Promise.reject({ status: 400, message: "Please enter a numerical id" });
  }

  postCommentToArticle(username, body, article_id)
    .then((data) => {
      res.status(201).send({ comments: data });
    })
    .catch(next);
};

module.exports = {postComment}