const db = require("../db/connection");
const {fetchArticleData} = require("./fetch-models")

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

module.exports = {postCommentToArticle}
