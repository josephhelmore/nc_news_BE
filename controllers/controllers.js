const db = require("../db/connection");

const getTopics = (req, res) => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    res.status(200).send({ topics: rows });
  });
};

const getArticles = (req, res) => {
  const rowsData = db
    .query(
      `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) :: INT AS comment_count  FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC;`
    )
    .then(({ rows }) => {
      res.status(200).send({ articles: rows });
    })
  return rowsData;
};

module.exports = {
  getTopics,
  getArticles,
};
