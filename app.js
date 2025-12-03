const cors = require('cors');
const express = require("express");
const app = express();
const db = require("./db/connection");
const updateControllers = require("./controllers/update-controllers");
const getControllers = require('./controllers/get-controllers')
const postControllers = require('./controllers/post-controllers')
const deleteControllers = require('./controllers/delete-controllers')

app.use(cors());
app.use(express.json());
app.use('/api', express.static("public"));

//to do; 
/*
move error handling to an error controller file
move controllers into their own targetted files ; snacks, articles, users etc
move models into their own targetted files ; snacks, articles, users etc
add more error handling 
*/

app.get("/api/topics", getControllers.getTopics);
app.get("/api/articles", getControllers.getArticles);
app.get("/api/users", getControllers.getUsers);
app.patch("/api/articles/:article_id", updateControllers.updateArticleVotes);
app.get("/api/articles/:article_id", getControllers.getArticleData);
app.get("/api/articles/:article_id/comments", getControllers.getArticleComments);
app.post("/api/articles/:article_id/comments", postControllers.postComment);
app.delete("/api/comments/:comment_id", deleteControllers.deleteCommentById);


app.use((err, req, res, next) => {
  if (err.status && err.message) {
    return res.status(err.status).send({ message: err.message });
  }

  if (err.code === "22P02") {
    return res.status(400).send({ message: "Please enter a numerical id" });
  }

  console.log(err);
  
  res.status(500).send({ message: "Internal Server Error" });
});




module.exports = app;
