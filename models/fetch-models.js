const db = require("../db/connection");
const { isFound } = require("./model-error-handling");

const fetchTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => rows);
};
const fetchArticles = async (sort_by, order, topic) => {
  const columns = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "comment_count",
    "article_img_url",
  ];

  if (topic) {
    const { rows } = await db.query(`SELECT * FROM articles WHERE topic = $1`, [
      topic,
    ]);
    return rows;
  }

  const orders = ["ASC", "DESC"];

  if (!columns.includes(sort_by) && sort_by) {
    return Promise.reject({
      status: 400,
      message: "Please enter a valid column.",
    });
  }

  if (!orders.includes(order) && order) {
    return Promise.reject({
      status: 400,
      message: "Please enter a valid order. Either ASC or DESC",
    });
  }

  const sorted = columns.includes(sort_by) ? sort_by : "created_at";
  const ordered = orders.includes(order) ? order : "DESC";

  return db
    .query(
      `SELECT articles.article_id,
      articles.title,
      articles.topic,
      articles.author,
      articles.created_at,
      articles.votes, 
      articles.article_img_url, 
      COUNT(comments.comment_id) :: INT AS comment_count FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY ${sorted} ${ordered};`
    )
    .then(({ rows }) => {
      return rows;
    });
};
const fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => rows);
};
const fetchArticleData = async (article_id) => {
  const { rows } = await db.query(
    `SELECT articles.article_id,
    articles.title,
    articles.topic,
    articles.author,
    articles.body,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT(comments.comment_id) :: INT AS comment_count FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
    [article_id]
  );

  isFound(rows);

  return rows[0];
};

const fetchArticleComments = (article_id) => {
  return fetchArticleData(article_id)
    .then(() => {
      return db.query(
        `SELECT * FROM comments WHERE article_id = $1
      ORDER BY created_at ASC;`,
        [article_id]
      );
    })
    .then(({ rows }) => {
      return rows;
    });
};
module.exports = {
  fetchTopics,
  fetchArticles,
  fetchUsers,
  fetchArticleData,
  fetchArticleComments,
};
