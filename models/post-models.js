const db = require("../db/connection");
const { fetchArticleData } = require("./fetch-models");

const postCommentToArticle = async (username, body, article_id) => {
  await fetchArticleData(article_id);

  const { rows } = await db.query(
    `SELECT username FROM users WHERE username = $1`,
    [username]
  );

  if (rows.length === 0) {
    throw { status: 404, message: "Username not found" };
  }

  const result = await db.query(
    `INSERT INTO comments (author, body, article_id) 
    VALUES ($1, $2, $3) 
    RETURNING *;`,
    [username, body, article_id]
  );
  return result.rows[0];
};

module.exports = { postCommentToArticle };
