const express = require("express");
const app = express();
const db = require("./db/connection");
const controllers = require("./controllers/controllers");

app.get("/api/topics", controllers.getTopics);
app.get("/api/articles", controllers.getArticles);




module.exports = app;
