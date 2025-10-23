const express = require("express");
const app = express();
const db = require("./db/connection");
const controllers = require("./controllers/controllers");

app.get("/api/topics", controllers.getTopics);
app.get("/api/articles", controllers.getArticles);
app.get("/api/users", controllers.getUsers);
app.get("/api/articles/:article_id", controllers.getArticleData);
app.get("/api/articles/:article_id/comments", controllers.getArticleComments);

app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(500).send({ message: "There has been an error" });
  }
});

module.exports = app;
