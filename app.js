const cors = require('cors');
const express = require("express");
const app = express();

const articlesRouter = require('./routes/articles-router')
const commentsRouter = require('./routes/comments-router')
const topicsRouter = require('./routes/topics-router')
const usersRouter = require('./routes/users-router')

app.use(cors());
app.use(express.json());
app.use('/api', express.static("public"));

app.use('/api/articles', articlesRouter);
app.use('/api/comments', commentsRouter);
app.use('/api', topicsRouter);
app.use('/api', usersRouter);



app.use((err, req, res, next) => {
  if (err.status && err.message) {
    return res.status(err.status).send({ message: err.message });
  }
  console.log(err);
  res.status(500).send({ message: "Internal Server Error" });
});

app.use((req, res, next) => {
  res.status(404).send({ message: "Path not found" });
});


module.exports = app;
