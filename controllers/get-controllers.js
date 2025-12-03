const db = require("../db/connection");
const {
  fetchTopics,
  fetchArticles,
  fetchUsers,
  fetchArticleData,
  fetchArticleComments,
} = require("../models/fetch-models");
const { isTopic, validId } = require("./controller-error-handling");


const getTopics = async (req, res) => {
  try {
    const topics =  await fetchTopics();
    res.status(200).send({ topics });
  } catch (err) {
    next(err);
  }
};
const getArticles = async (req, res, next) => {
  try {
    const { sort_by, order, topic } = req.query;

    if (topic) {
      await isTopic(topic);
    }

    const articles = await fetchArticles(sort_by, order, topic);
    res.status(200).send({ articles });
  } catch (err) {
    next(err);
  }
};
const getUsers = async (req, res) => {
  try {
    fetchUsers().then((users) => {
      res.status(200).send({ users });
    });
  } catch (err) {
    next(err);
  }
};
const getArticleData = async (req, res, next) => {
  try {
    const { article_id } = req.params;

    await validId(article_id);

    const data = await fetchArticleData(article_id);

    if (!data) {
      return res.status(404).send({ msg: "Article not found" });
    }

    res.status(200).send({ article: data });
  } catch (err) {
    next(err);
  }
};
const getArticleComments = async (req, res, next) => {
  try {
    const { article_id } = req.params;

    await validId(article_id)

    const data = await fetchArticleComments(article_id);

    res.status(200).send({ comments: data });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTopics,
  getArticles,
  getUsers,
  getArticleData,
  getArticleComments,
};
