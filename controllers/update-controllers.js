const { updatedVotes } = require("../models/update-models");

const updateArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;


  updatedVotes(article_id, inc_votes)
    .then((data) => {
      res.status(200).send({ article: data });
    })
    .catch(next);
};

module.exports = {
  updateArticleVotes,
};
