const db = require ("../db/connection")
const {fetchArticleData} = require("./fetch-models")

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

module.exports = {updatedVotes}