const {deleteComment} = require('../models/delete-modules')
const {validNumber} = require("./controller-error-handling")

const deleteCommentById = async (req, res, next) => {
  const { comment_id } = req.params;
 await validNumber(comment_id)
  deleteComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

module.exports = {deleteCommentById}