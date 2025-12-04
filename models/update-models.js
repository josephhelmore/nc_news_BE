const db = require("../db/connection");
const { fetchArticleData } = require("./fetch-models");

const updatedVotes = async (article_id, inc_votes) => {
  await fetchArticleData(article_id);
  const { rows } = await db.query(
    `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
    [inc_votes, article_id]
  );

  return rows[0];
};

module.exports = { updatedVotes };
