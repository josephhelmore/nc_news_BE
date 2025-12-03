const {deleteComment} = require('../models/delete-modules')

const deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

module.exports = {deleteCommentById}