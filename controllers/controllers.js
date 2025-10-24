const db = require("../db/connection");
const {
  fetchArticles,
  fetchTopics,
  fetchUsers,
  fetchArticleData,
  fetchArticleComments,
  postCommentToArticle,
  updatedVotes,
} = require("../models/models");

const getTopics = (req, res) => {
  fetchTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};
const getArticles = (req, res) => {
  fetchArticles().then((articles) => {
    res.status(200).send({ articles });
  });
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

module.exports = {
  getTopics,
  getArticles,
  getUsers,
  getArticleData,
  getArticleComments,
  postComment,
  updateArticleVotes,
};
