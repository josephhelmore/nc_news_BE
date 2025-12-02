const {postCommentToArticle} = require('../models/models')


const postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;


  postCommentToArticle(username, body, article_id)
    .then((data) => {
      res.status(201).send({ comments: data });
    })
    .catch(next);
};

module.exports = {postComment}