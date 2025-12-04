const { updatedVotes } = require("../models/update-models");
const {validNumber} = require("./controller-error-handling")

const updateArticleVotes = async(req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

await validNumber(article_id)
await validNumber(inc_votes)


  updatedVotes(article_id, inc_votes)
    .then((data) => {
      res.status(200).send({ article: data });
    })
    .catch(next);
};

module.exports = {
  updateArticleVotes,
};
