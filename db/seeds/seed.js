const db = require("../connection");
const format = require("pg-format");
const { convertTimestampToDate, formatData } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(`DROP TABLE IF EXISTS topics, users, articles, comments;`)
    .then(() => {
      return db.query(
        `CREATE TABLE topics (
        slug VARCHAR(20) PRIMARY KEY NOT NULL,
        description VARCHAR(100) NOT NULL,
        img_url VARCHAR(1000) NOT NULL
        );`
      );
    })
    .then(() => {
      return db.query(
        `CREATE TABLE users (
        username VARCHAR(20) PRIMARY KEY NOT NULL,
        name VARCHAR(20) NOT NULL,
        avatar_url VARCHAR(1000)
        );`
      );
    })
    .then(() => {
      return db.query(`
        CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        topic VARCHAR(20) NOT NULL REFERENCES topics(slug),
        author VARCHAR(20) NOT NULL REFERENCES users(username),
        body TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        votes INT DEFAULT 0,
        article_img_url VARCHAR(1000) );`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        article_id INT NOT NULL REFERENCES articles(article_id),
        body TEXT NOT NULL,
        votes INT DEFAULT 0,
        author VARCHAR(20) NOT NULL REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`);
    })
    .then(() => {
      const formattedTopic = formatData(topicData);
      const sqlString = format(
        `INSERT INTO topics(description, slug, img_url) VALUES %L`,
        formattedTopic
      );
      return db.query(sqlString);
    })
    .then(() => {
      const formattedUsers = formatData(userData);
      const sqlString = format(
        `INSERT INTO users(username, name, avatar_url) VALUES %L`,
        formattedUsers
      );
      return db.query(sqlString);
    })
    .then(() => {
      const updatedArticleData = articleData.map((object) => {
        return convertTimestampToDate(object);
      });

      const formattedData = formatData(updatedArticleData);
      const sqlString = format(
        `INSERT INTO articles(created_at, title, topic, author, body, votes, article_img_url) VALUES %L`,
        formattedData
      );
      return db.query(sqlString);
    })
    .then(() => {
      return db
        .query(`SELECT article_id, title FROM articles`)
        .then(({ rows }) => {
          const articleLookup = {};
          rows.forEach(({ article_id, title }) => {
            articleLookup[title] = article_id;
          });
          const formattedData = commentData.map((comment) => {
            const { article_title, ...rest } = comment;
            return {
              article_id: articleLookup[article_title],
              ...rest,
            };
          });
          const newCommentData = formattedData.map((object) => {
            return convertTimestampToDate(object);
          });
          const finalCommentData = formatData(newCommentData);
          const sqlString = format(
            `INSERT INTO comments (created_at, article_id, body, votes, author)  VALUES %L`,
            finalCommentData
          );
          return db.query(sqlString);
        });
    });
};

module.exports = seed;
