const db = require("../db/connection");
const controllers = require("../controllers/controllers");

const fetchTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => rows);
};
const fetchArticles = (sort_by, order) => {
  const validColumns = [
    "article_id",
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "comment_count",
  ];
  const orders = ["ASC", "DESC"];

  const sorted = validColumns.includes(sort_by) ? sort_by : "created_at";
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
const fetchArticleData = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          message: "This article does not exist",
        });
      }
      return article;
    });
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
const postCommentToArticle = (username, body, article_id) => {
  return fetchArticleData(article_id).then(() => {
    return db
      .query(
        `INSERT INTO comments (body, author,article_id) VALUES ($1, $2, $3) RETURNING *`,
        [body, username, article_id]
      )
      .then(({ rows }) => {
        return rows[0];
      });
  });
};
const updatedVotes = (article_id, inc_votes) => {
  return fetchArticleData(article_id).then(() => {
    return db
      .query(
        `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
        [inc_votes, article_id]
      )
      .then(({ rows }) => {
        return rows[0];
      });
  });
};
const deleteComment = (comment_id) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
      comment_id,
    ])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          message: "Comment not found",
        });
      }
    });
};

module.exports = {
  fetchArticles,
  fetchTopics,
  fetchUsers,
  fetchArticleData,
  fetchArticleComments,
  postCommentToArticle,
  updatedVotes,
  deleteComment,
};
