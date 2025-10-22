const db = require("../db/connection");
const controllers = require ("../controllers/controllers")


const topics = (topicData) => {
      return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return res.status(200).send({ topics: rows });
  });
}




module.exports = {
topics
}