const { postCommentToArticle } = require("../models/post-models");
const { validId } = require("./controller-error-handling");

const postComment = async (req, res, next) => {

  try {  const { article_id } = req.params;
  const { body, username } = req.body;

   validId(article_id)
  const comment = await postCommentToArticle(username, body, article_id)
  console.log(comment)
  res.status(201).send({comment})
} catch (err) {next (err)}
 

  // validId(article_id)
  //   .then(() => postCommentToArticle(username, body, article_id))
  //   .then((comment) => res.status(201).send({ comment }))
  //   .catch(next);

  // postCommentToArticle(username, body, article_id)
  //   .then((data) => {
  //     res.status(201).send({ comments: data });
  //   })
  //   .catch(next);
};

module.exports = { postComment };
