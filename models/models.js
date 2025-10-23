const db = require("../db/connection");
const controllers = require("../controllers/controllers");

const fetchTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => rows);
};
const fetchArticles = () => {
  return db
    .query(
      `SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) :: INT AS comment_count  FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC;`
    )
    .then(({ rows }) => rows);
};
const fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => rows);
};
const fetchArticleData = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      const article = rows[0];
      if (!article) {
        return Promise.reject({
          status: 404,
          message: "Please enter a valid article_id",
        });
      }
      return article;
    });
};
const fetchArticleComments = async (article_id) => {
  await fetchArticleData(article_id);

  const { rows: comments } = await db.query(
    `SELECT * FROM comments WHERE article_id = $1
      ORDER BY created_at ASC;`,
    [article_id]
  );
  return comments;
};
const postCommentToArticle = async (username, body, article_id) => {
  await fetchArticleData(article_id);

  const result = await db.query(
    `INSERT INTO comments (body, author,article_id) VALUES ($1, $2, $3) RETURNING *`,
    [body, username, article_id]
  );
  return result.rows[0];
};
module.exports = {
  fetchArticles,
  fetchTopics,
  fetchUsers,
  fetchArticleData,
  fetchArticleComments,
  postCommentToArticle,
};
