const db = require("../db/connection");
const { sort } = require("../db/data/test-data/articles");
const {
  fetchArticles,
  fetchTopics,
  fetchUsers,
  fetchArticleData,
  fetchArticleComments,
  postCommentToArticle,
  updatedVotes,
  deleteComment,
} = require("../models/models");

const getTopics = (req, res) => {
  fetchTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};
const getArticles = (req, res, next) => {
  const { sort_by, order, topic} = req.query;
  fetchArticles(sort_by, order, topic).then((articles) => {
    res.status(200).send({ articles });
  })
  .catch(next);
};
const getUsers = (req, res) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  });
};
const getArticleData = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleData(article_id)
    .then((data) => {
      res.status(200).send({ article: data });
    })
    .catch(next);
};
const getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleComments(article_id)
    .then((data) => {
      res.status(200).send({ comments: data });
    })
    .catch(next);
};
const postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { body, username } = req.body;

  postCommentToArticle(username, body, article_id)
    .then((data) => {
      res.status(201).send({ comments: data });
    })
    .catch(next);
};
const updateArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updatedVotes(article_id, inc_votes)
    .then((data) => {
      res.status(200).send({ article: data });
    })
    .catch(next);
};
const deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
const APIHome = (req, res) => {
  res.status(200).type('text/plain').send({ message: `Thank you for visiting my first, small back-end project.
    Since you have already added /api to the url - Here are some more end-points for you to try;
    /topics 
    /articles 
    /users 
    /articles/:article_id 
    /articles/:article_id/comments 
    You can also POST comments to /articles/:article_id/comments and PATCH votes to /articles/:article_id 
    Enjoy :)` });
}

module.exports = {
  getTopics,
  getArticles,
  getUsers,
  getArticleData,
  getArticleComments,
  postComment,
  updateArticleVotes,
  deleteCommentById,
  APIHome
};
