const db = require("../db/connection");
const { fetchArticles, fetchTopics, fetchUsers } = require("../models/models");

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
    console.log(users)
    res.status(200).send({ users });
  });
};

module.exports = {
  getTopics,
  getArticles,
  getUsers,
};
