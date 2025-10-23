const db = require("../db/connection");
const {
  fetchArticles,
  fetchTopics,
  fetchUsers,
  fetchArticleData,
  fetchArticleComments,
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
  fetchArticleComments(article_id).then((data) => {
    res.status(200).send({ comments: data });
  })
  .catch(next)
};
module.exports = {
  getTopics,
  getArticles,
  getUsers,
  getArticleData,
  getArticleComments,
};
