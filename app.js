const express = require("express");
const app = express();
const db = require("./db/connection");
const controllers = require("./controllers/controllers");
app.use(express.json());


//to do; 
/*
move error handling to an error controller file
move controllers into their own targetted files ; snacks, articles, users etc
move models into their own targetted files ; snacks, articles, users etc
add more error handling 
*/

app.get("/api/topics", controllers.getTopics);
app.get("/api/articles", controllers.getArticles);
app.get("/api/users", controllers.getUsers);
app.patch("/api/articles/:article_id", controllers.updateArticleVotes);
app.get("/api/articles/:article_id", controllers.getArticleData);
app.get("/api/articles/:article_id/comments", controllers.getArticleComments);
app.post("/api/articles/:article_id/comments", controllers.postComment);
app.delete("/api/comments/:comment_id", controllers.deleteCommentById);

app.use((err, req, res, next) => {
    if (err.code === "22P02") {
      res.status(400).send({ message: "Please enter a numerical article_id" });
    } else {
      next(err);
    }
  });

app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(500).send({ message: "There has been an error" });
  }
});



module.exports = app;
