const db = require("../db/connection");
const { isFound } = require("./model-error-handling");

const deleteComment = async (comment_id) => {
  const { rows } = await db.query(
    `DELETE FROM comments WHERE comment_id = $1 RETURNING *`,
    [comment_id]
  );

  isFound(rows);
};

module.exports = {
  deleteComment,
};
